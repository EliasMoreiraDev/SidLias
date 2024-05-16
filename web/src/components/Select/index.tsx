import React, { SelectHTMLAttributes } from 'react';
import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    option1?: {
        value: string;
        label: string;
    } | null;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, option1, ...rest }) => {
    return (
        <div className='select-block'>
            <label htmlFor={name}>{label}</label>
            <select value='' name={name} id={name} {...rest}>
                {option1 ? (
                    <option value={option1.value} disabled hidden>
                        {option1.label}
                    </option>
                ) : null}
                {!option1 && <option value='' disabled hidden>Selecione uma opção</option>}
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>;
                })}
            </select>
        </div>
    );
};

export default Select;
