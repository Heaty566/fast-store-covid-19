import { User } from '../user/entity/user.entity';
import { fakeData } from './test.helper';

export const fakeUser = () => {
      const user = new User();
      user.name = fakeData(10, 'lettersLowerCase');
      user.googleId = fakeData(10, 'lettersAndNumbersLowerCase');
      user.email = `${fakeData(10, 'letters')}@gmail.com`;

      return user;
};
