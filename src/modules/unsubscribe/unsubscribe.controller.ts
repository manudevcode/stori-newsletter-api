import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RecipientsService } from '../recipients/recipients.service';
import { Response } from 'express';
import { Recipient } from '../recipients/recipient.model';

@Controller('unsubscribe')
export class UnsubscribeController {
  constructor(private recipientsService: RecipientsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('by-email/:email')
  async getRecipient(@Param('email') email: any, @Res() res: Response) {
    const recipientUser = await this.recipientsService.recipientUser(email);
    res.send(recipientUser);
  }

  @HttpCode(HttpStatus.OK)
  @Get('available-lists')
  async getLists(@Param('email') email: any, @Res() res: Response) {
    const recipientsLists = await this.recipientsService.recipientsList({
      name: 1,
    });
    res.send(recipientsLists);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async updateUserSettings(
    @Body() body: Recipient,
    @Req() req: any,
    @Res() res: Response,
  ) {
    await this.recipientsService.recipientModel.updateOne(
      {
        email: body?.email,
      },
      {
        recipientsList: body?.recipientsList,
      },
    );
    return res.send(true);
  }
}
