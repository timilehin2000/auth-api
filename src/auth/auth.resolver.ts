import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register.dto';
import { LoginInput } from './dto/login.dto';
import { BiometricLoginInput } from './dto/biometric.dto';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterUserInput) {
    const { email, password } = registerInput;
    return this.authService.register(email, password);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput) {
    const { email, password } = loginInput;
    return this.authService.login(email, password);
  }

  @Mutation(() => AuthResponse)
  async biometricLogin(
    @Args('input') biometricLoginInput: BiometricLoginInput,
  ) {
    const { biometricKey } = biometricLoginInput;
    return this.authService.biometricLogin(biometricKey);
  }
}
