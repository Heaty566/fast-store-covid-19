import * as React from 'react';
import { useForm } from 'react-hook-form';
import { productAPI } from '../../api/productApi';
import useFormError from '../../common/hooks/useFormError';
import { UpdateProductDto, UpdateProductForm } from '../../common/interface/dto/product.dto';
import { Product } from '../../common/interface/product.interface';
import FormButton from '../form/formBtn';
import TextField from '../form/textFiled';

interface UpdateProductProps {
        value: Product;
}
const defaultValues: UpdateProductForm = {
        id: '',
        name: '',
        price: '',
        quantity: '',
};

const UpdateProductItem: React.FunctionComponent<UpdateProductProps> = ({ value }) => {
        const errors = useFormError<UpdateProductForm>(defaultValues);
        const { register, handleSubmit } = useForm<UpdateProductDto>({
                defaultValues: {
                        name: value.name,
                        quantity: value.quantity,
                        price: value.price,
                },
        });

        const handleOnUpdate = (input: UpdateProductDto) => {
                productAPI.updateProduct({ id: value.id, name: input.name, price: input.price, quantity: input.quantity });
        };

        return (
                <form onSubmit={handleSubmit(handleOnUpdate)} className="p-4 space-y-2 border border-gray-300 rounded-lg ">
                        <div className="w-16 h-16">
                                <img
                                        src={process.env.REACT_APP_SERVER_URL + value.imageUrl}
                                        className="object-cover w-full h-full"
                                        alt={value.name}
                                />
                        </div>
                        <TextField error={errors.name} field="name" label="Tên" register={register} />
                        <TextField error={errors.quantity} type="number" field="quantity" label="Số Lượng" register={register} />
                        <TextField error={''} type="number" field="price" label="Giá" register={register} />{' '}
                        <div className="w-24">
                                <FormButton label={'Update'} isLoading={false} />
                        </div>
                </form>
        );
};

export default UpdateProductItem;
