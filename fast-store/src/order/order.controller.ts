import { Body, Controller, Post } from '@nestjs/common';
import { apiResponse } from 'src/app/interface/apiResponse';
import { ProductService } from '../product/product.service';
import { JoiValidatorPipe } from '../utils/validator/validator.pipe';
import { NewOrderDto, vNewOrderDto } from './dto/newOrderDto';
import axios from 'axios';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
      constructor(private readonly productService: ProductService, private readonly orderService: OrderService) {}

      @Post()
      async newOrder(@Body(new JoiValidatorPipe(vNewOrderDto)) body: NewOrderDto) {
            const productIds = body.products.map((item) => item.id);
            console.log(productIds);

            const products = await this.productService.getProductsByIds(productIds);
            if (productIds.length !== products.length) {
                  throw apiResponse.sendError({ details: { errorMessage: { type: 'field.not-found' } } }, 'BadRequestException');
            }

            const checkProduct = products.map((item) => {
                  const index = productIds.indexOf(item.id);
                  if (index === -1) {
                        throw apiResponse.sendError({ details: { errorMessage: { type: 'field.not-found' } } }, 'BadRequestException');
                  }

                  if (item.quantity < body.products[index].quantity) {
                        throw apiResponse.sendError(
                              {
                                    details: {
                                          errorMessage: { type: 'error.not-enough', context: { name: item.name, quantity: String(item.quantity) } },
                                    },
                              },
                              'BadRequestException',
                        );
                  }

                  const obj = {
                        id: item.id,
                        quantity: body.products[index].quantity,
                        name: item.name,
                  };
                  return obj;
            });

            const orderMessage = checkProduct.map((item) => item.name + ' - ' + item.quantity).join('\n');

            const formatMessage =
                  `[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}] Level: ${'Don Hang Moi'} \n\n` +
                  `Thong tin nguoi nhan\n` +
                  `Ten: ${body.name}\n` +
                  `SDT: ${body.phone}\n` +
                  `DIA CHI: ${body.address}\n\n` +
                  `Thong Tin Don Hang\n` +
                  `${orderMessage}\n\n` +
                  '- - - - - - - - - - - - - - - - - - - - -';
            const url = `${process.env.TELEGRAM_URL}${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${
                  process.env.CHAT_ID
            }&text=${this.orderService.removeVietnameseTones(formatMessage)}`;
            await axios.get(url);
            await products.map(async (item) => {
                  const index = productIds.indexOf(item.id);
                  item.quantity -= body.products[index].quantity;
                  await this.productService.saveProduct(item);
            });

            return apiResponse.send({ details: { message: { type: 'message.update-success' } } });
      }
}
