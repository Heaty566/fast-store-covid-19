import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';

//---- Service

//---- Entity
import { User } from '../user/entity/user.entity';
import { apiResponse } from '../app/interface/apiResponse';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
      constructor(private userService: UserService) {
            super({
                  clientID: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_SECRET,
                  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
                  scope: ['email', 'profile'],
            });
      }

      async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
            try {
                  const validEmail = process.env.VALID_EMAIL.split(',') || [];
                  if (validEmail.includes(profile._json.email)) {
                        let user = await this.userService.findOneUserByField('googleId', profile.id);
                        if (!user) {
                              user = new User();
                              user.googleId = profile.id;
                              user.name = profile.displayName;
                              user.email = profile._json.email;
                              user = await this.userService.saveUser(user);
                        }
                        done(null, user);
                  } else {
                        done(apiResponse.sendError({}, 'InternalServerErrorException'), null);
                  }
            } catch (err) {
                  done(err, null);
            }
      }
}
