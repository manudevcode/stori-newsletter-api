import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  RecipientsList,
  RecipientsListDocument,
} from './recipients-list.model';
import { Recipient, RecipientDocument } from './recipient.model';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectModel(Recipient.name)
    public recipientModel: Model<RecipientDocument>,
    @InjectModel(RecipientsList.name)
    public recipientsListModel: Model<RecipientsListDocument>,
  ) {}

  recipientsList(projection = {}) {
    return this.recipientsListModel.find({}, projection);
  }

  recipientUsers() {
    return this.recipientModel.find().populate('recipientsList', 'name');
  }

  async recipientsEmails(id: string) {
    return (
      await this.recipientModel.find(
        {
          recipientsList: id,
        },
        {
          _id: -1,
          email: 1,
        },
      )
    ).map((recipient) => recipient.email);
  }

  recipientUser(email: string) {
    return this.recipientModel.findOne({ email });
  }

  validateFileContent(emails: any[]) {
    for (let index = 0; index < emails.length; index++) {
      const email = emails[index];

      if (email.split(',').length > 1) {
        throw new BadRequestException(
          'The CSV file is not in the correct format',
        );
      }
    }
  }
}
