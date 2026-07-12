import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        failedLoginAttempts: number;
        isLocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            failedLoginAttempts: number;
            isLocked: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
}
