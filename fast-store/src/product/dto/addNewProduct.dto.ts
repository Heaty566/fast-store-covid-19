import * as Joi from 'joi';

//---- Service
import { ValidatorService } from '../../utils/validator/validator.service';

//---- Entity
import { Product } from '../entity/product.entity';

//---- Common
import { productJoiSchema } from '../../utils/validator/schema/product.validator';

const { getJoiSchemas } = ValidatorService.joiSchemaGenerator<Product>(productJoiSchema);

export class AddNewProductDto {
      name: string;
      price: number;
      quantity: number;
}
export const vAddNewProductDto = Joi.object({
      ...getJoiSchemas(['name', 'price', 'quantity']),
});
