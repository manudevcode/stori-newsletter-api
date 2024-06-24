import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  resend;
  constructor() {
    this.resend = new Resend(process.env.RESEND_API);
    // this.sendMail();
  }

  async sendMail(
    subject: string,
    recipients: string[],
    file: any,
    message: string,
  ) {
    for (let index = 0; index < recipients.length; index++) {
      const email = recipients[index];
      const defaultMessage = `
        ${message}
        </br>
        </br>
        </br>
        <a href="${process.env.FRONT_URL}/unsubscribe/${email}">Manage mailing settings</a>
    `;

      await this.resend.emails.send({
        from: 'no-reply@interiorespersia.com',
        to: [email],
        subject: subject,
        html: defaultMessage,
        attachments: [
          {
            content: file.buffer,
            filename: file.filename,
          },
        ],
      });
    }
  }
}
