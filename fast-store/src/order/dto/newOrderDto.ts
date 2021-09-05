import * as Joi from 'joi';
import { JoiPhoneFormat } from 'joi-phone-validation';

export class OrderItem {
      id: string;
      quantity: number;
}

export class NewOrderDto {
      name: string;
      address: string;
      phone: string;
      message: string;
      products: OrderItem[];
}

export const vNewOrderDto = Joi.object({
      name: Joi.string().min(1).max(100).required(),
      address: Joi.string().min(1).max(100).required(),
      phone: JoiPhoneFormat.string().bothPhoneFormat('vi').required(),
      message: Joi.string().max(1000).required(),
      products: Joi.array()
            .items(
                  Joi.object({
                        id: Joi.string().required(),
                        quantity: Joi.number().min(1).max(200).required(),
                  }),
            )
            .required(),
});
