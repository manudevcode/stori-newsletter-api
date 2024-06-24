import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Newsletter, NewsletterSchema } from './newsletter.model';
import { RecipientsModule } from '../recipients/recipients.module';
import { ResendService } from 'src/services/resend/resend.service';
import { ScheduleService } from '../schedule/schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newsletter.name, schema: NewsletterSchema },
    ]),
    RecipientsModule,
  ],
  providers: [NewsletterService, ResendService, ScheduleService],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
