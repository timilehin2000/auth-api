import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { SetBiometricKeyInput } from './dto/set-biometric-key.input';
import { UserModel } from './models/user.model';
import { CurrentUser } from '../common/decorator/current-user.decorator';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get currently authenticated user
   */
  @Query(() => UserModel, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User): Promise<UserModel> {
    const foundUser = await this.usersService.findById(user.id);
    if (!foundUser) throw new BadRequestException('User not found');
    return foundUser;
  }

  /**
   * Set biometric key for authentication
   */
  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async setBiometricKey(
    @CurrentUser() user: User,
    @Args('input') input: SetBiometricKeyInput,
  ): Promise<UserModel> {
    if (!input.biometricKey)
      throw new BadRequestException('Biometric key is required');

    return this.usersService.setBiometricKey(user.id, input.biometricKey);
  }
}
