import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    try {
      const { licenseExpiryDate, ...rest } = createDriverDto;
      return await this.prisma.driver.create({
        data: {
          ...rest,
          licenseExpiryDate: new Date(licenseExpiryDate),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Driver with this license number or user ID already exists');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.driver.findMany();
  }

  async findOne(id: string) {
    const driver = await this.prisma.driver.findUnique({ where: { id } });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try {
      const { licenseExpiryDate, ...rest } = updateDriverDto;
      return await this.prisma.driver.update({
        where: { id },
        data: {
          ...rest,
          ...(licenseExpiryDate && { licenseExpiryDate: new Date(licenseExpiryDate) }),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Driver not found');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.driver.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Driver not found');
      }
      throw error;
    }
  }
}
