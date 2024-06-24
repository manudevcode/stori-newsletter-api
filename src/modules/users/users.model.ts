import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class User {
  @IsNotEmpty()
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @IsNotEmpty()
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
