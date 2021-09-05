import { Injectable } from '@nestjs/common';
import Product from './entity/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
      constructor(private readonly productRepository: ProductRepository) {}

      public async getProductById(id: string) {
            return await this.productRepository.findOneByField('id', id);
      }

      public async saveProduct(product: Product) {
            return await this.productRepository.saveProduct(product);
      }

      public async getAll() {
            return await this.productRepository.getAll();
      }

      public async getProductsByIds(ids: string[]) {
            return await this.productRepository.getManyByIds(ids);
      }
}
