import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type RecipientsListDocument = HydratedDocument<RecipientsList>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class RecipientsList {
  @IsNotEmpty()
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  initialSubscribers: number;

  @Prop({ required: true })
  currentSubscribers: number;
}

export class RecipientsListDto {
  @IsNotEmpty()
  name: string;

  emails: string;
}

export const RecipientsListSchema =
  SchemaFactory.createForClass(RecipientsList);
