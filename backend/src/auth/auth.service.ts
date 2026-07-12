import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.role !== dto.role) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isLocked) {
      throw new UnauthorizedException('Account is locked due to too many failed attempts');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      const failedAttempts = user.failedLoginAttempts + 1;
      const isLocked = failedAttempts >= 5;

      await this.prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: failedAttempts, isLocked },
      });

      if (isLocked) {
        throw new UnauthorizedException('Account is locked due to too many failed attempts');
      } else {
        const attemptsLeft = 5 - failedAttempts;
        throw new UnauthorizedException(`Invalid credentials. You have ${attemptsLeft} attempt(s) left.`);
      }
    }

    if (user.failedLoginAttempts > 0) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: 0 },
      });
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetails } = user;
    
    // Ensure we return the reset failedLoginAttempts if it was updated
    userDetails.failedLoginAttempts = 0;

    return {
      user: userDetails,
      access_token: this.jwtService.sign(payload),
    };
  }
}
