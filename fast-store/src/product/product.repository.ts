import { EntityRepository } from 'typeorm';

//---- Entity
import { Product } from './entity/product.entity';

//---- Service
import { RepositoryService } from '../utils/repository/repository.service';

@EntityRepository(Product)
export class ProductRepository extends RepositoryService<Product> {
      /**
       *
       *
       * @description get with common information (not include password, email, or phone)
       */

      public async saveProduct(product: Product) {
            return await this.save(product);
      }

      public async getAll() {
            return await this.find();
      }

      public async getManyByIds(ids: string[]) {
            return await this.findManyByArrayValue('id', ids, true);
      }
}
