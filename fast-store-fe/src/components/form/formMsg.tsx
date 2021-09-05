import * as React from "react";

export interface FormMsgProps {
        isError: boolean;
        errorMessage?: string;
        message?: string;
        isLoading: boolean;
}

const FormMsg: React.FC<FormMsgProps> = ({ isError, errorMessage = "", message = "", isLoading }) => {
        return (
                <>
                        {Boolean(isError) && !isLoading && <p className="text-red-500 fade-in">{errorMessage}</p>}
                        {Boolean(!isError) && !isLoading && <p className="text-green-500 fade-in ">{message}</p>}
                </>
        );
};

export default FormMsg;
