import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import User from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import Product from './product/entity/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';
import * as path from 'path';

const Config = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.env.${process.env.NODE_ENV}`,
});

const DBConfig = TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      keepConnectionAlive: true,
      entities: [User, Product],
      extra: { connectionLimit: 1 },
});

@Module({
      imports: [Config, DBConfig, AuthModule, UserModule, ProductModule, OrderModule],
      controllers: [],
      providers: [],
})
export class AppModule {}
