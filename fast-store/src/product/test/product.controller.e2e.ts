import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

//---- Helper
import { initTestModule } from '../../test/initTest';
import { fakeData, generateCookie } from '../../test/test.helper';
import { AddNewProductDto } from '../dto/addNewProduct.dto';
import { UpdateProductDto } from '../dto/updateProduct.dto';
import Product from '../entity/product.entity';
import { ProductRepository } from '../product.repository';

describe('AuthController', () => {
      let app: INestApplication;
      let resetDB: any;
      let cookieData: Array<string>;
      let productRepository: ProductRepository;

      beforeAll(async () => {
            const { getApp, module, getToken, resetDatabase } = await initTestModule();
            app = getApp;
            cookieData = generateCookie(await getToken());
            resetDB = resetDatabase;
            productRepository = module.get<ProductRepository>(ProductRepository);
      });

      describe('GET api/product', () => {
            const reqApi = (cookie) => supertest(app.getHttpServer()).get(`/api/product`).set({ cookie }).send();

            beforeEach(async () => {
                  const product = new Product();
                  await productRepository.save(product);
            });

            it('Pass get all product', async () => {
                  const res = await reqApi(cookieData);

                  expect(res.status).toBe(200);
                  expect(res.body.data.length).toBeGreaterThanOrEqual(1);
            });
      });
      describe('Post api/product', () => {
            const reqApi = (cookie, input: AddNewProductDto) =>
                  supertest(app.getHttpServer())
                        .post(`/api/product`)
                        .set({ cookie })
                        .attach('image', `${__dirname}/../../../src/test/testFile/photo.png`)
                        .field('name', input.name)
                        .field('quantity', input.quantity)
                        .field('price', input.price);
            let product: Product;

            beforeEach(async () => {
                  product = new Product();
                  product.imageUrl = '/';
                  product.price = Number(fakeData(2, 'number'));
                  product.quantity = Number(fakeData(2, 'number'));
                  product.name = fakeData(10, 'lettersLowerCase');
            });

            it('Pass', async () => {
                  const res = await reqApi(cookieData, { name: product.name, price: product.price, quantity: product.quantity });
                  const isExist = await productRepository.findOneByField('name', product.name);

                  expect(isExist).toBeDefined();
                  expect(res.status).toBe(201);
            });
      });

      describe('Put api/product', () => {
            const reqApi = (cookie, input: UpdateProductDto) => supertest(app.getHttpServer()).put(`/api/product`).set({ cookie }).send(input);
            let product: Product;
            let input: UpdateProductDto;

            beforeEach(async () => {
                  product = new Product();
                  product = await productRepository.save(product);

                  input = {
                        id: product.id,
                        name: fakeData(10, 'lettersLowerCase'),
                        price: Number(fakeData(2, 'number')),
                        quantity: Number(fakeData(2, 'number')),
                  };
            });

            it('Update Product New Product', async () => {
                  const res = await reqApi(cookieData, input);
                  const isExist = await productRepository.findOneByField('name', product.name);

                  expect(isExist).toBeDefined();
                  expect(res.status).toBe(200);
            });
            it('Failed', async () => {
                  input.id = '123';
                  const res = await reqApi(cookieData, input);

                  expect(res.status).toBe(404);
            });
      });

      afterAll(async () => {
            await resetDB();
            await app.close();
      });
});
