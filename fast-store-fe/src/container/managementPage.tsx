import * as React from 'react';
import { useSelector } from 'react-redux';
import { productAPI } from '../api/productApi';
import { ApiState } from '../common/interface/api.interface';
import { Product } from '../common/interface/product.interface';
import FormMsg from '../components/form/formMsg';

import UpdateProductItem from '../components/product/updateProductItem';
import { RootState } from '../store';

interface ManagementPageProps {}

const ManagementPage: React.FunctionComponent<ManagementPageProps> = () => {
        const [products, setProducts] = React.useState<Product[]>([]);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        React.useEffect(() => {
                productAPI.getAll().then((data) => setProducts(data));
        }, []);

        const handleOnDelete = (id: string) => {
                productAPI.deleteProduct(id).then(() => {
                        productAPI.getAll().then((data) => setProducts(data));
                });
        };

        return (
                <div className="space-y-2">
                        <h1 className="text-2xl font-semibold">Quản Lý Sản Phẩm</h1>
                        <div className="w-full p-2 space-y-2 bg-white rounded-md">
                                <FormMsg
                                        isError={apiState.isError}
                                        isLoading={apiState.isLoading}
                                        message={apiState.message}
                                        errorMessage={apiState.errorMessage}
                                />
                                {products.map((item) => (
                                        <UpdateProductItem key={item.id} value={item} handleOnDelete={handleOnDelete} />
                                ))}
                        </div>
                </div>
        );
};

export default ManagementPage;
