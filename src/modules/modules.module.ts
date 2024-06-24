import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { RecipientsModule } from './recipients/recipients.module';
import { UnsubscribeModule } from './unsubscribe/unsubscribe.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [UsersModule, AuthModule, NewsletterModule, RecipientsModule, UnsubscribeModule, ScheduleModule],
})
export class ModulesModule {}
