import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { User } from '../users/users.model';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async auth(
    @Body() { email, password }: User,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.login(user);
    return res.send(token);
  }
}
