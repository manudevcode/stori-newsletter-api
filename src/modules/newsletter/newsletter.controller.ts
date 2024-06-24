import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipientsService } from '../recipients/recipients.service';
import { Newsletter } from './newsletter.model';
import { diskStorage } from 'multer';
import * as path from 'path';

@UseGuards(AuthGuard)
@Controller('newsletter')
export class NewsletterController {
  constructor(private newsletterService: NewsletterService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getNewsletters(@Res() res: Response) {
    const newsletters = await this.newsletterService.getNewsletters();
    return res.send(newsletters);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './newsletter-files',
        filename: (req, file, cb) => {
          cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  @Post()
  async createNewsletter(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const newsletter = await this.newsletterService.createNewsletter({
      title: body.title,
      recipientList: body.recipientList,
      date: body.date,
      message: body.message,
      file: file.filename,
    });

    if (body.date) {
      this.newsletterService.scheduleNewsletter(newsletter);
    } else {
      this.newsletterService.sendNewsletter(newsletter);
    }

    res.send(true);
  }
}
