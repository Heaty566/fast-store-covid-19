import * as React from 'react';
import { Product } from '../common/interface/product.interface';
import ProductItem from './product/productItem';

interface ListProductProps {
        products: Product[];
        handleOnAdd: (id: string, quantity: number) => void;
}

const ListProduct: React.FunctionComponent<ListProductProps> = ({ products = [], handleOnAdd }) => {
        return (
                <div className="space-y-2 border md:w-101">
                        <h1 className="text-xl font-semibold ">Chọn Sản Phẩm</h1>
                        <div className="space-y-2 fade-in">
                                {products.map((item) =>
                                        item.quantity > 0 ? <ProductItem key={item.id} value={item} handleOnAdd={handleOnAdd} /> : null
                                )}
                        </div>
                </div>
        );
};

export default ListProduct;
