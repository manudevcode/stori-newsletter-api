import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  /**
   * Compare string with a bcrypt hash
   * @param password String
   * @param hashedPassword String
   *
   * @returns result Boolean
   */
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.userModel.findOne({
      email: email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const compare = await this.compare(password, user?.password);
    if (user && compare) {
      return user;
    } else {
      throw new UnauthorizedException('Wrong user or password');
    }
  }

  /**
   * Create token for user
   * @param user User
   */
  async login(user: any) {
    const userData = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = await this.jwtService.signAsync(userData, {
      secret: process.env.JWT_KEY,
      expiresIn: '30d',
    });
    return {
      token,
      userData,
    };
  }
}
