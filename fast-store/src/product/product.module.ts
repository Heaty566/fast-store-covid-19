import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
      imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
      controllers: [ProductController],
      providers: [ProductService],
      exports: [ProductService, TypeOrmModule],
})
export class ProductModule {}
