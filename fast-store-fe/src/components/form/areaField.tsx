import * as React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface AreaFieldProps {
        field: string;
        label: string;
        register: UseFormRegister<any>;
        error: string;
}

const AreaField: React.FunctionComponent<AreaFieldProps> = ({ error, field, label, register }) => {
        return (
                <div className="space-y-1">
                        <label className="font-medium" htmlFor={field}>
                                {label}
                        </label>
                        <textarea {...register(field)} className="block w-full px-2 py-1 border rounded-sm focus:outline-none"></textarea>
                        {Boolean(error.length) && (
                                <p className="text-red-500">
                                        {label} {error}
                                </p>
                        )}
                </div>
        );
};

export default AreaField;
