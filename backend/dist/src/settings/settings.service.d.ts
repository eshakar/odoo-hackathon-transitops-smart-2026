import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        depotName: string;
        currency: string;
        distanceUnit: string;
    }>;
    updateSettings(updateSettingDto: UpdateSettingDto): Promise<{
        id: string;
        updatedAt: Date;
        depotName: string;
        currency: string;
        distanceUnit: string;
    }>;
}
