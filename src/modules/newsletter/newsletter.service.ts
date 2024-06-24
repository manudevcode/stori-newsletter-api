import { Injectable } from '@nestjs/common';
import { Newsletter, NewsletterDocument } from './newsletter.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipientsService } from '../recipients/recipients.service';
import { ResendService } from 'src/services/resend/resend.service';
import { ScheduleService } from '../schedule/schedule.service';
import * as fs from 'fs';
@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Newsletter.name)
    public newsletterModel: Model<NewsletterDocument>,
    private recipientsService: RecipientsService,
    private resendService: ResendService,
    private scheduleService: ScheduleService,
  ) {}

  getNewsletters(query = {}) {
    return this.newsletterModel.find(query).populate('recipientList', 'name');
  }

  async createNewsletter(data) {
    const newsletter = new this.newsletterModel(data);
    await newsletter.save();
    return newsletter;
  }

  async sendNewsletter(newsletter) {
    const newsletterData = await this.newsletterModel.findById(newsletter._id);
    if (newsletterData?.canceled) return;

    const emails = await this.recipientsService.recipientsEmails(
      newsletterData?.recipientList,
    );

    const filepath = './newsletter-files/' + newsletterData.file;
    const file = await fs.promises.readFile(filepath);

    const fileToSend = {
      buffer: file,
      filename: newsletterData.file,
    };

    await this.resendService.sendMail(
      newsletter.title,
      emails,
      fileToSend,
      newsletterData?.message,
    );

    await this.newsletterModel.updateOne(
      { _id: newsletter._id },
      {
        $set: {
          sent: true,
        },
      },
    );
  }

  async scheduleNewsletter(newsletter) {
    const milliseconds = this.scheduleService.getMillisecondsFromDate(
      newsletter.date,
    );
    const callback = async () => {
      this.sendNewsletter(newsletter);
    };

    this.scheduleService.scheduleTask(newsletter, milliseconds, callback);
  }
}
