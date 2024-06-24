import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ResendService } from './services/resend/resend.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ModulesModule,
    MongooseModule.forRoot(process.env.DB_STRING_CONNECTION, {}),
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './newsletter-files',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
