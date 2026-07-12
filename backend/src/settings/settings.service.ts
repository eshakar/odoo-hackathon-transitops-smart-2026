import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings() {
    let setting = await this.prisma.setting.findUnique({
      where: { id: 'global' },
    });

    if (!setting) {
      setting = await this.prisma.setting.create({
        data: {
          id: 'global',
        },
      });
    }

    return setting;
  }

  async updateSettings(updateSettingDto: UpdateSettingDto) {
    const setting = await this.getSettings();

    return this.prisma.setting.update({
      where: { id: setting.id },
      data: updateSettingDto,
    });
  }
}
