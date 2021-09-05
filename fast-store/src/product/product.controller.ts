import { Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UserGuard } from '../auth/auth.guard';
import { apiResponse } from '../app/interface/apiResponse';
import { checkFileExtension, checkFileSize, imageExtension } from '../utils/file/file.helper';
import { JoiValidatorPipe } from '../utils/validator/validator.pipe';
import { AddNewProductDto, vAddNewProductDto } from './dto/addNewProduct.dto';
import { UpdateProductDto, vUpdateProductDto } from './dto/updateProduct.dto';
import Product from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
      constructor(private readonly productService: ProductService) {}

      @Get()
      async getProduct() {
            const product = await this.productService.getAll();

            return apiResponse.send({ data: product });
      }

      @Post()
      // @UseGuards(UserGuard)
      @UseInterceptors(
            FileInterceptor('image', {
                  dest: 'public/',
                  storage: diskStorage({
                        filename: function (req, file, callback) {
                              callback(null, Date.now() + path.extname(file.originalname));
                        },
                        destination: function (req, file, callback) {
                              const dest = 'public/';
                              callback(null, dest);
                        },
                  }),
            }),
      )
      async addNewProduct(@UploadedFile() file: Express.Multer.File, @Body(new JoiValidatorPipe(vAddNewProductDto)) body: AddNewProductDto) {
            //checking file is exist
            if (!file) throw apiResponse.sendError({ details: { image: { type: 'any.required' } } }, 'BadRequestException');

            //checking size
            const isCorrectSize = checkFileSize(file, 2);
            if (!isCorrectSize)
                  throw apiResponse.sendError(
                        {
                              details: { image: { type: 'field.file-too-big', context: { size: '2' } } },
                        },
                        'BadRequestException',
                  );

            // checking extension
            const isCorrectFileExtension = checkFileExtension(file, imageExtension);
            if (!isCorrectFileExtension)
                  throw apiResponse.sendError({ details: { image: { type: 'field.file-wrong-extension' } } }, 'BadRequestException');

            const product = new Product();
            product.name = body.name;
            product.price = body.price;
            product.quantity = body.quantity;
            product.imageUrl = '/' + file.filename;

            const insertedProduct = await this.productService.saveProduct(product);
            if (!insertedProduct) throw apiResponse.sendError({}, 'InternalServerErrorException');

            return apiResponse.send({ details: { message: { type: 'message.update-success' } } });
      }

      @Put()
      @UseGuards(UserGuard)
      async updateProduct(@Body(new JoiValidatorPipe(vUpdateProductDto)) body: UpdateProductDto) {
            const product = await this.productService.getProductById(body.id);
            if (!product) throw apiResponse.sendError({ details: { id: { type: 'field.not-found' } } }, 'NotFoundException');

            product.name = body.name;
            product.price = body.price;
            product.quantity = body.quantity;

            const insertedProduct = await this.productService.saveProduct(product);
            if (!insertedProduct) throw apiResponse.sendError({}, 'InternalServerErrorException');

            return apiResponse.send({ details: { message: { type: 'message.update-success' } } });
      }
}
