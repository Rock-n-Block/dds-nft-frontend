import React, { ChangeEvent } from 'react';
import { Input } from 'antd';

interface InputNumberProps {
  id: undefined | string;
  value: string | number;
  className?: string;
  suffix?: string;
  size?: 'small' | 'middle' | 'large' | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: any) => void;
  integer?: boolean;
  positiveOnly?: boolean;
  max?: number;
  min?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({
  integer = false,
  positiveOnly = false,
  className,
  value,
  size,
  id,
  onBlur,
  placeholder,
  onChange,
  max,
  min,
}) => {
  const getRegex = () => {
    if (integer) {
      return positiveOnly ? /^[+]?[1-9]\d*$/ : /^[-+]?[1-9]\d*$/;
    }
    return positiveOnly ? /^[+]?([.]\d+|\d+[.]?\d*)$/ : /^[-+]?([.]\d+|\d+[.]?\d*)$/;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reg = getRegex();
    const inputValue = e.target.value;
    if (
      (!Number.isNaN(inputValue) && reg.test(inputValue)) ||
      inputValue === '' ||
      (!positiveOnly && inputValue === '-')
    ) {
      if (max) {
        if (min) {
          if (min <= +inputValue && +inputValue <= max) onChange(e);
        }
        if (+inputValue <= max) onChange(e);
      } else {
        if (min) {
          if (min <= +inputValue) onChange(e);
        }
        onChange(e);
      }
    }
  };
  return (
    <Input
      id={id}
      value={value}
      className={className}
      size={size}
      type="text"
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      onBlur={onBlur}
    />
  );
};
export default InputNumber;
