import * as React from "react";
import { UseFormRegister } from "react-hook-form";
import TextField from "./form/textFiled";
import { CreateOrderDto } from "../common/interface/dto/order.dto";
import FormButton from "./form/formBtn";
import { ApiState } from "../common/interface/api.interface";
import AreaField from "./form/areaField";
import FormMsg from "./form/formMsg";

interface ContactFormProps {
        errors: CreateOrderDto;
        apiState: ApiState;
        register: UseFormRegister<CreateOrderDto>;
        handleOnSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ContactForm: React.FunctionComponent<ContactFormProps> = ({ errors, apiState, register, handleOnSubmit }) => {
        return (
                <form onSubmit={handleOnSubmit} className="p-2 space-y-2 bg-white rounded-lg shadow-lg md:w-101">
                        <FormMsg
                                isError={apiState.isError}
                                isLoading={apiState.isLoading}
                                errorMessage={apiState.errorMessage}
                                message={apiState.message}
                        />
                        <TextField error={errors.name} field="name" label="Họ Và Tên" register={register} />
                        <TextField error={errors.phone} field="phone" label="Số Điện Thoại" register={register} />
                        <TextField error={errors.address} field="address" label="Địa Chỉ" register={register} />
                        <AreaField error={errors.message} field="message" label="Ghi Chú" register={register} />
                        <FormButton isLoading={apiState.isLoading} label="Đặt Hàng" />
                </form>
        );
};

export default ContactForm;
