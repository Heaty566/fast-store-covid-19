import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { productAPI } from "../api/productApi";

import useFormError from "../common/hooks/useFormError";
import { useUploadFile } from "../common/hooks/useUploadFile";
import { ApiState } from "../common/interface/api.interface";
import { AddNewProductForm } from "../common/interface/dto/product.dto";
import FormButton from "../components/formBtn";
import FormMsg from "../components/formMsg";
import TextField from "../components/textFiled";
import { RootState } from "../store";
interface AddNewProductProps {}

const defaultValues: AddNewProductForm = {
        image: "",
        name: "",
        price: "",
        quantity: "",
};

const AddNewProduct: React.FunctionComponent<AddNewProductProps> = () => {
        const { register, handleSubmit, reset } = useForm<AddNewProductForm>({ defaultValues });
        const [file, handleOnUpload, setFile] = useUploadFile();

        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError(defaultValues);

        const onSubmit = (input: AddNewProductForm) => {
                if (file)
                        productAPI
                                .addNewProduct({
                                        image: file,
                                        name: input.name,
                                        price: Number(input.price),
                                        quantity: Number(input.quantity),
                                })
                                .then(() => {
                                        reset({ ...defaultValues });
                                        setFile(undefined);
                                });
        };

        return (
                <form onSubmit={handleSubmit(onSubmit)} className="p-2 my-2 space-y-2 bg-white rounded-lg shadow-lg md:w-101">
                        <FormMsg
                                isError={apiState.isError}
                                isLoading={apiState.isLoading}
                                message={apiState.message}
                                errorMessage={apiState.errorMessage}
                        />
                        <div className="space-y-2">
                                <img
                                        src={file ? URL.createObjectURL(file) : "/asset/images/default-image.jpg"}
                                        className="w-16 h-16"
                                        alt="san pham"
                                />
                                <input type="file" onChange={handleOnUpload} />
                        </div>
                        <TextField register={register} error={errors.name} field="name" label="Tên Sản Phẩm" />
                        <TextField register={register} type="number" error={errors.quantity} field="quantity" label="Số Lượng" />
                        <TextField register={register} type="number" error={errors.price} field="price" label="Giá Tiền" />

                        <div>
                                <FormButton isLoading={apiState.isLoading} label="Thêm Mới" />
                        </div>
                </form>
        );
};

export default AddNewProduct;
