import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type NewsletterDocument = HydratedDocument<Newsletter>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Newsletter {
  @IsNotEmpty()
  @Prop()
  title: string;

  @Prop()
  file: string;

  @Prop()
  message: string;

  @IsNotEmpty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecipientsList',
    required: false,
  })
  recipientList: string;

  @Prop()
  date: Date;

  @Prop({
    default: false,
  })
  canceled: boolean;

  @Prop({
    default: false,
  })
  sent: boolean;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);
