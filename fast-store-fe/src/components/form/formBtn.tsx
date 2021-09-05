import * as React from "react";
import Loading from "../loading/loading";

interface FormButtonProps {
        label: string;
        isLoading: boolean;
}

const FormButton: React.FunctionComponent<FormButtonProps> = ({ isLoading, label }) => {
        return isLoading ? (
                <div className="text-center">
                        <Loading />
                </div>
        ) : (
                <button className="w-full px-2 py-2 text-white bg-blue-600 rounded-md ">{label}</button>
        );
};

export default FormButton;
