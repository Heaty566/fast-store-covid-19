import { Test, TestingModule } from '@nestjs/testing';

//* Internal import
import { routers } from '../routers';
import { AppModule } from '../app.module';
import { fakeUser } from './fakeEntity';

//---- Repository
import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../product/product.repository';
import { AuthService } from '../auth/auth.service';

const resetDatabase = async (module: TestingModule) => {
      const userRepository = module.get<UserRepository>(UserRepository);
      const productRepository = module.get<ProductRepository>(ProductRepository);

      await userRepository.createQueryBuilder().delete().execute();
      await userRepository.clear();

      await productRepository.createQueryBuilder().delete().execute();
      await productRepository.clear();
};

export const initTestModule = async () => {
      const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
      }).compile();

      const configModule = module.createNestApplication();
      //apply middleware
      routers(configModule);
      const getApp = await configModule.init();

      //create a fake user and token
      const userRepository = module.get<UserRepository>(UserRepository);
      const authService = module.get<AuthService>(AuthService);

      // create a fake admin

      return {
            getApp,
            module,
            configModule,

            resetDatabase: async () => await resetDatabase(module),
            getToken: async () => authService.createAuthToken(await userRepository.save(fakeUser())),
      };
};
