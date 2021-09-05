import * as Joi from 'joi';

//---- Service
import { ValidatorService } from '../../utils/validator/validator.service';

//---- Entity
import { Product } from '../entity/product.entity';

//---- Common
import { productJoiSchema } from '../../utils/validator/schema/product.validator';

const { getJoiSchemas } = ValidatorService.joiSchemaGenerator<Product>(productJoiSchema);

export class UpdateProductDto {
      name: string;
      price: number;
      quantity: number;
      id: string;
}
export const vUpdateProductDto = Joi.object({
      ...getJoiSchemas(['name', 'price', 'quantity', 'id']),
});
