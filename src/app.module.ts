import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { ShortsModule } from './shorts/shorts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    ShortsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      type: 'postgres',
      host: process.env.DB_HOST,
      extra:
        process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // in production, synchronize should be set to false
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
