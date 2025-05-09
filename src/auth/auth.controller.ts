import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';
import { single } from 'rxjs';
import { sign } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'OK',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'OK',
    }
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('/logout')
  // logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
  //   res.cookie('access_token', '', {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     path: '/',
  //   });
  //   return {
  //     message: 'ok',
  //   };
  // }

}


