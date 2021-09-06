import * as React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextFieldProps {
        field: string;
        label: string;
        register: UseFormRegister<any>;
        error: string;
        type?: 'text' | 'number';
}

const TextField: React.FunctionComponent<TextFieldProps> = ({ field, label, register, error, type = 'text' }) => {
        return (
                <div className="space-y-1">
                        <label className="font-medium" htmlFor={field}>
                                {label}
                        </label>
                        <input type={type} {...register(field)} className="block w-full px-2 py-1 border rounded-sm focus:outline-none" />
                        {Boolean(error.length) && (
                                <p className="text-red-500">
                                        {label} {error}
                                </p>
                        )}
                </div>
        );
};

export default TextField;
