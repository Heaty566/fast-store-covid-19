import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
      constructor(private readonly authService: AuthService) {}

      @Post('/logout')
      @UseGuards(UserGuard)
      async cLogout(@Res() res: Response) {
            return res.cookie('auth-token', '', { maxAge: -999 }).send();
      }

      @Get('/google')
      @UseGuards(AuthGuard('google'))
      cGoogleAuth() {
            //
      }

      @Get('/google/callback')
      @UseGuards(AuthGuard('google'))
      async cGoogleAuthRedirect(@Req() req: Request, @Res() res: Response) {
            const reToken = await this.authService.createAuthToken(req.user);
            return res.cookie('auth-token', reToken, { maxAge: 86400 * 30 }).redirect(process.env.CLIENT_URL);
      }
}
