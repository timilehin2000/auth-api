import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByBiometricKey(biometricKey: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { biometricKey } });
  }

  async create(
    email: string,
    password: string,
    biometricKey?: string,
  ): Promise<User> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        biometricKey,
      },
    });
  }

  async setBiometricKey(userId: string, biometricKey: string): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { biometricKey },
    });

    if (existingUser) {
      throw new ConflictException('Biometric key already in use');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { biometricKey },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
