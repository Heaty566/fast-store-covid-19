import * as React from "react";
import { useForm } from "react-hook-form";
import useFormError from "../common/hooks/useFormError";
import TextField from "./textFiled";
import { CreateOrderDto } from "../common/interface/dto/order.dto";
import FormButton from "./formBtn";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ApiState } from "../common/interface/api.interface";
import { orderApi } from "../api/orderApi";

interface ContactFormProps {}

const defaultValues: CreateOrderDto = {
        address: "",
        name: "",
        phone: "",
        products: [],
};

const ContactForm: React.FunctionComponent<ContactFormProps> = () => {
        const { register, reset, handleSubmit } = useForm<CreateOrderDto>({ defaultValues });
        const errors = useFormError<CreateOrderDto>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        const handleOnSend = (input: CreateOrderDto) => {
                const cart = localStorage.getItem("cart");
                if (cart) {
                        orderApi.createOrder({ name: input.name, address: input.address, phone: input.phone, products: JSON.parse(cart) }).then(
                                () => {
                                        reset(defaultValues);
                                        localStorage.setItem("cart", JSON.stringify([]));
                                }
                        );
                }
        };

        return (
                <form onSubmit={handleSubmit(handleOnSend)} className="p-2 space-y-2 bg-white rounded-lg shadow-lg md:w-101">
                        <TextField error={errors.name} field="name" label="Họ Và Tên" register={register} />
                        <TextField error={errors.phone} field="phone" label="Số Điện Thoại" register={register} />
                        <TextField error={errors.address} field="address" label="Địa Chỉ" register={register} />

                        <div>
                                <label className="font-medium">Ghi Chú</label>
                                <textarea className="block w-full px-2 py-1 border rounded-sm focus:outline-none"> </textarea>
                        </div>
                        <FormButton isLoading={apiState.isLoading} label="Đặt Hàng" />
                </form>
        );
};

export default ContactForm;
