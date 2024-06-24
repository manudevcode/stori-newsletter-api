import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type RecipientDocument = HydratedDocument<Recipient>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Recipient {
  @IsNotEmpty()
  @Prop({ unique: true })
  email: string;

  @IsNotEmpty()
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'RecipientsList',
    default: [],
  })
  recipientsList: string[];
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
