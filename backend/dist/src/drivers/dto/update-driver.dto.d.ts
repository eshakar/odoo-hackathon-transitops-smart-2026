import { CreateDriverDto } from './create-driver.dto';
import { DriverStatus } from '@prisma/client';
declare const UpdateDriverDto_base: import("@nestjs/common").Type<Partial<CreateDriverDto>>;
export declare class UpdateDriverDto extends UpdateDriverDto_base {
    safetyScore?: number;
    status?: DriverStatus;
}
export {};
