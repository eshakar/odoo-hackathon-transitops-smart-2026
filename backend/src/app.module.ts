import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [PrismaModule, AuthModule, VehiclesModule, MaintenanceModule, DriversModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
