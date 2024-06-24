import { Module } from '@nestjs/common';
import { UnsubscribeController } from './unsubscribe.controller';
import { RecipientsModule } from '../recipients/recipients.module';

@Module({
  imports: [RecipientsModule],
  controllers: [UnsubscribeController],
})
export class UnsubscribeModule {}
