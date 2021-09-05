import * as React from "react";
import { Product } from "../common/interface/product.interface";

interface CartItemProps {
        product: Product;
        handleOnChange: (id: string, quantity: number) => void;
}

const CartItem: React.FunctionComponent<CartItemProps> = ({ product, handleOnChange }) => {
        return (
                <div className="flex items-center justify-between h-24 p-2 space-x-2 bg-white rounded-lg shadow-lg">
                        <div className="w-16 h-16 overflow-hidden border-2 rounded-full ">
                                <img
                                        src="https://w.ladicdn.com/s150x150/1744/mi-trung-safoco-400g-20210827094232.jpg"
                                        alt="mi"
                                        className="block object-cover"
                                />
                        </div>
                        <div className="w-1/2 space-y-1">
                                <p className="font-semibold">{product.name}</p>
                                <div className="flex space-x-2">
                                        <button
                                                type="button"
                                                onClick={() => handleOnChange(product.id, -1)}
                                                className="flex items-center justify-center w-6 h-6 font-semibold bg-blue-100"
                                        >
                                                -
                                        </button>
                                        <p>{product.quantity}</p>
                                        <button
                                                type="button"
                                                onClick={() => handleOnChange(product.id, 1)}
                                                className="flex items-center justify-center w-6 h-6 font-semibold bg-blue-100"
                                        >
                                                +
                                        </button>
                                </div>
                        </div>

                        <p className="flex-1 font-medium text-right text-yellow-600">{(product.price * product.quantity).toLocaleString("it-IT")}đ</p>
                </div>
        );
};

export default CartItem;
