import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}
}
