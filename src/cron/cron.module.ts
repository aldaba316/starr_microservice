import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// import { SchedulerMetadataAccessor } from './schedule-metadata.accessor';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';

@Module({
  imports:[ ScheduleModule.forRoot() ],
  controllers: [CronController],
  providers: [CronService]
})
export class CronModule {}
