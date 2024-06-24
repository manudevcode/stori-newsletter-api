import { Module } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { RecipientsController } from './recipients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipientsList, RecipientsListSchema } from './recipients-list.model';
import { Recipient, RecipientSchema } from './recipient.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipient.name, schema: RecipientSchema },
      { name: RecipientsList.name, schema: RecipientsListSchema },
    ]),
  ],
  providers: [RecipientsService],
  exports: [RecipientsService],
  controllers: [RecipientsController],
})
export class RecipientsModule {}
