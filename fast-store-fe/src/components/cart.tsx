import * as React from "react";
import { Product } from "../common/interface/product.interface";
import { OrderItem } from "../container/homePage";
import CartItem from "./product/cartItem";

interface CartProps {
        products: Product[];
        orderItems: OrderItem[];
        handleOnChange: (id: string, quantity: number) => void;
}

const Cart: React.FunctionComponent<CartProps> = ({ products, orderItems, handleOnChange }) => {
        const [selectedProduct, setSelectedProduct] = React.useState<Product[]>([]);
        const [totalPrice, setTotalPrice] = React.useState<number>(0);

        React.useEffect(() => {
                let total = 0;
                const filterProduct = orderItems.map((item) => {
                        const product = products.filter((product) => product.id === item.id)[0];
                        product.quantity = item.quantity;

                        total += item.quantity * product.price;
                        return product;
                });

                setSelectedProduct(filterProduct);
                setTotalPrice(total);
        }, [orderItems, products]);

        return (
                <div className="space-y-2">
                        <h1 className="text-xl font-semibold">Giỏ Hàng</h1>
                        <div className="space-y-2 md:w-101">
                                <div className="fixed px-2 py-4 space-y-2 font-semibold transform -translate-x-1/2 bg-white border rounded-lg shadow-2xl bottom-4 w-101 left-1/2">
                                        <div className="flex items-center justify-between">
                                                <p>Tổng Đơn Hàng</p>
                                                <p className="text-blue-600">{totalPrice.toLocaleString("it-IT")}đ</p>
                                        </div>
                                        <button className="w-full px-2 py-2 text-white bg-blue-600 rounded-md">Xem Giỏ Hàng</button>
                                </div>
                                {selectedProduct.map((item) => (
                                        <CartItem key={item.id} product={item} handleOnChange={handleOnChange} />
                                ))}
                        </div>
                </div>
        );
};

export default Cart;
