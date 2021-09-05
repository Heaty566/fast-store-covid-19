import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { orderApi } from '../api/orderApi';
import { productAPI } from '../api/productApi';
import useFormError from '../common/hooks/useFormError';
import { ApiState } from '../common/interface/api.interface';
import { CreateOrderDto } from '../common/interface/dto/order.dto';
import { Product } from '../common/interface/product.interface';
import Cart from '../components/cart';
import ContactForm from '../components/contactForm';
import ListProduct from '../components/listProduct';
import { RootState } from '../store';

const defaultValues: CreateOrderDto = {
        address: '',
        name: '',
        phone: '',
        message: '',
        products: [],
};

export interface OrderItem {
        id: string;
        quantity: number;
}

interface OrderProps {}

const HomePage: React.FunctionComponent<OrderProps> = () => {
        const [products, setProducts] = React.useState<Product[]>([]);
        const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);
        const { register, reset, handleSubmit } = useForm<CreateOrderDto>({ defaultValues });
        const errors = useFormError<CreateOrderDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        const handleOnOrder = (input: CreateOrderDto) => {
                const cart = localStorage.getItem('cart');
                if (cart) {
                        orderApi.createOrder({
                                name: input.name,
                                message: input.message,
                                address: input.address,
                                phone: input.phone,
                                products: JSON.parse(cart),
                        }).then(() => {
                                reset(defaultValues);
                                localStorage.setItem('cart', JSON.stringify([]));
                                setOrderItems([]);
                        });
                }
        };

        React.useEffect(() => {
                productAPI.getAll().then((data) => setProducts(data));
        }, []);

        React.useEffect(() => {
                const cart = localStorage.getItem('cart');
                if (cart && products.length) setOrderItems(JSON.parse(cart));
        }, [products]);

        const handleOnAddToCart = (id: string, quantity: number) => {
                const newOrderItems = [...orderItems];

                for (let index = 0; index < newOrderItems.length; index++) {
                        if (id === newOrderItems[index].id) {
                                newOrderItems[index].quantity += quantity;
                                if (newOrderItems[index].quantity <= 0) newOrderItems.splice(index, 1);
                                setOrderItems(newOrderItems);
                                localStorage.setItem('cart', JSON.stringify(newOrderItems));
                                return;
                        }
                }

                newOrderItems.push({ id, quantity: 1 });
                setOrderItems(newOrderItems);
                localStorage.setItem('cart', JSON.stringify(newOrderItems));
        };

        return (
                <div className="flex flex-col justify-center flex-1 py-8 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                        <ListProduct products={products} handleOnAdd={handleOnAddToCart} />
                        <div className="space-y-2">
                                <h1 className="text-xl font-semibold">Thông Tin Người Nhận</h1>
                                <ContactForm apiState={apiState} errors={errors} handleOnSubmit={handleSubmit(handleOnOrder)} register={register} />
                                <Cart products={products} orderItems={orderItems} handleOnChange={handleOnAddToCart} />
                        </div>
                </div>
        );
};

export default HomePage;
