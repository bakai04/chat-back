import { Module } from '@nestjs/common';
import { DataCleanerService } from './data-cleaner.service';

@Module({
  providers: [DataCleanerService],
  
})
export class DataCleanerModule {}
