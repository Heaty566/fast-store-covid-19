import * as React from "react";
import { productAPI } from "../api/productApi";
import { Product } from "../common/interface/product.interface";
import Cart from "../components/cart";
import ContactForm from "../components/contactForm";
import ListProduct from "../components/listProduct";

export interface OrderItem {
        id: string;
        quantity: number;
}

interface OrderProps {}

const Order: React.FunctionComponent<OrderProps> = () => {
        const [products, setProducts] = React.useState<Product[]>([]);
        const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);

        React.useEffect(() => {
                productAPI.getAll().then((data) => setProducts(data));
        }, []);

        React.useEffect(() => {
                const cart = localStorage.getItem("cart");
                if (cart && products.length) setOrderItems(JSON.parse(cart));
        }, [products]);

        const handleOnAddToCart = (id: string, quantity: number) => {
                const newOrderItems = [...orderItems];

                for (let index = 0; index < newOrderItems.length; index++) {
                        if (id === newOrderItems[index].id) {
                                newOrderItems[index].quantity += quantity;
                                if (newOrderItems[index].quantity <= 0) newOrderItems.splice(index, 1);
                                setOrderItems(newOrderItems);
                                localStorage.setItem("cart", JSON.stringify(newOrderItems));
                                return;
                        }
                }

                newOrderItems.push({ id, quantity: 1 });
                setOrderItems(newOrderItems);
                localStorage.setItem("cart", JSON.stringify(newOrderItems));
        };

        return (
                <div className="flex flex-col justify-center flex-1 py-8 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                        <ListProduct products={products} handleOnAdd={handleOnAddToCart} />
                        <div className="space-y-2">
                                <h1 className="text-xl font-semibold">Thông Tin Người Nhận</h1>
                                <ContactForm />
                                <Cart products={products} orderItems={orderItems} handleOnChange={handleOnAddToCart} />
                        </div>
                </div>
        );
};

export default Order;
