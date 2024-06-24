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
import { AuthGuard } from '../auth/auth.guard';
import { RecipientsService } from './recipients.service';
import { Response } from 'express';
import { RecipientsListDto } from './recipients-list.model';
import { FileInterceptor } from '@nestjs/platform-express';
@UseGuards(AuthGuard)
@Controller('recipients')
export class RecipientsController {
  constructor(private recipientService: RecipientsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getRecipients(@Res() res: Response) {
    const recipientsList = await this.recipientService.recipientsList();
    return res.send(recipientsList);
  }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  async getRecipientsUsers(@Res() res: Response) {
    const recipientUsers = await this.recipientService.recipientUsers();
    return res.send(recipientUsers);
  }

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createList(
    @UploadedFile() file,
    @Body() body: RecipientsListDto,
    @Res() res: Response,
  ) {
    let emails;

    if (file) {
      emails = file.buffer.toString().split(/\n/);
      this.recipientService.validateFileContent(emails);
    } else {
      emails = body?.emails.split(',');
    }

    const newRecipientsList = new this.recipientService.recipientsListModel({
      name: body?.name,
      initialSubscribers: emails.length,
      currentSubscribers: emails.length,
    });

    const insertions = [];

    for (let index = 0; index < emails.length; index++) {
      insertions.push(
        this.recipientService.recipientModel.updateOne(
          {
            email: emails[index],
          },
          [
            {
              $set: {
                email: emails[index],
                recipientsList: {
                  $ifNull: [
                    {
                      $concatArrays: [
                        '$recipientsList',
                        [newRecipientsList._id],
                      ],
                    },
                    [newRecipientsList._id],
                  ],
                },
              },
            },
          ],
          {
            upsert: true,
          },
        ),
      );
    }

    newRecipientsList.save();
    await Promise.all(insertions);
    return res.send('Recipients list created');
  }
}
