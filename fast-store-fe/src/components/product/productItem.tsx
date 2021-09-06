import * as React from 'react';
import { Product } from '../../common/interface/product.interface';

interface ProductCardProps {
        value: Product;
        handleOnAdd: (id: string, quantity: number) => void;
}

const ProductItem: React.FunctionComponent<ProductCardProps> = ({ value, handleOnAdd }) => {
        return (
                <div className="flex items-center justify-between p-2 space-x-2 bg-white rounded-lg shadow-lg">
                        <div className="w-16 h-16 overflow-hidden border-2 rounded-full ">
                                <img src={process.env.REACT_APP_STATIC_URL + value.imageUrl} alt="mi" className="block object-cover w-full h-full" />
                        </div>
                        <div className="w-1/2">
                                <p className="font-semibold first-letter">{value.name}</p>
                                <p className="font-medium text-yellow-600">{value.price.toLocaleString('it-IT')}đ</p>
                        </div>

                        <button type="button" className="px-2 py-1 text-white bg-blue-600 rounded-md " onClick={() => handleOnAdd(value.id, 1)}>
                                Chọn Mua
                        </button>
                </div>
        );
};

export default ProductItem;
