import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';

//---- Service
import { AuthService } from './auth.service';

//---- Common
import { apiResponse } from '../app/interface/apiResponse';

@Injectable()
export class UserGuard implements CanActivate {
      constructor(private authService: AuthService) {}

      private async deleteAllAuthToken(res: Response) {
            res.cookie('auth-token', '', { maxAge: -999 });
      }

      async canActivate(context: ExecutionContext) {
            const req: Request = context.switchToHttp().getRequest();
            const res: Response = context.switchToHttp().getResponse();

            // get refreshToken and authToken

            const authToken = req.cookies['auth-token'] || '';

            //checking re-token
            if (!authToken) {
                  res.cookie('re-token', '', { maxAge: 0 });
                  throw apiResponse.sendError({}, 'UnauthorizedException');
            }

            //checking auth-token

            const user = await this.authService.getUserByAuthToken(authToken);
            if (!user) {
                  this.deleteAllAuthToken(res);
                  throw apiResponse.sendError({}, 'UnauthorizedException');
            }
            req.user = user;

            return true;
      }
}
