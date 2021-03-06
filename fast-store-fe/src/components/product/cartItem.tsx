import * as React from 'react';
import { Product } from '../../common/interface/product.interface';

interface CartItemProps {
        product: Product;
        handleOnChange: (id: string, quantity: number) => void;
}

const CartItem: React.FunctionComponent<CartItemProps> = ({ product, handleOnChange }) => {
        return (
                <div className="flex items-center justify-between p-2 space-x-2 bg-white rounded-lg shadow-lg fade-in">
                        <div className="w-16 h-16 overflow-hidden border-2 rounded-full ">
                                <img src={process.env.REACT_APP_STATIC_URL + product.imageUrl} alt="mi" className="block object-cover" />
                        </div>
                        <div className="w-1/2 space-y-1">
                                <p className="font-semibold first-letter">{product.name}</p>
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

                        <p className="flex-1 font-medium text-right text-yellow-600">{(product.price * product.quantity).toLocaleString('it-IT')}??</p>
                </div>
        );
};

export default CartItem;
