import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { apiResponse } from 'src/app/interface/apiResponse';
import { UserGuard } from 'src/auth/auth.guard';
import User from './entity/user.entity';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}

      @Get('/')
      @UseGuards(UserGuard)
      async cGetUser(@Req() req: Request) {
            //get user
            const user = await this.userService.findOneUserByField('id', req.user.id);

            return apiResponse.send<User>({ data: user });
      }
}
