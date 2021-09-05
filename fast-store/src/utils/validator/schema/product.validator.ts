import * as Joi from 'joi';

import { Product } from '../../../product/entity/product.entity';

export function productJoiSchema(field: keyof Product) {
      switch (field) {
            case 'id':
                  return Joi.string().required();
            case 'name':
                  return Joi.string().min(1).max(100).trim().lowercase().required();
            case 'imageUrl':
                  return Joi.string().trim().required();
            case 'price':
                  return Joi.number().required();
            case 'quantity':
                  return Joi.number().required();
      }
}
