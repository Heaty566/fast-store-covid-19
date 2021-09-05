import UserExtend from './src/user/entity/user.entity';

declare global {
      namespace Express {
            interface User extends UserExtend {
                  //
            }
      }
}
