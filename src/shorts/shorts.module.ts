import { Module } from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { ShortsController } from './shorts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Short } from './entities/short.entity';

@Module({
  controllers: [ShortsController],
  providers: [ShortsService],
  imports: [TypeOrmModule.forFeature([Short])],
  exports: [ShortsService],
})
export class ShortsModule {}
