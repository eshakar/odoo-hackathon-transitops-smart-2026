import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
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
