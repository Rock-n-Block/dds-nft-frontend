import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import BigNumber from 'bignumber.js/bignumber';

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
  // min?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({
  integer = false,
  positiveOnly = false,
  className,
  value,
  size,
  suffix,
  id,
  onBlur,
  placeholder,
  onChange,
  max,
  // min,
}) => {
  const getRegex = () => {
    if (integer) {
      return positiveOnly ? /^[+]?[1-9]\d*$/ : /^[-+]?[1-9]\d*$/;
    }
    return positiveOnly ? /^[+]?([.]\d+|\d+[.]?\d*)$/ : /^[-+]?([.]\d+|\d+[.]?\d*)$/;
  };

  /*  const checkMin = (comparingValue: string) => {
    const arrayedComparingValue = Array.from(String(comparingValue), Number);
    const arrayedMin = Array.from(String(min), Number);
    let index = 0;
    for (const elem of arrayedComparingValue) {
      if (new BigNumber(arrayedMin[index]).isLessThan(new BigNumber(elem))) return true;
      if (
        !(
          (
            new BigNumber(arrayedMin[index]).isLessThanOrEqualTo(new BigNumber(elem)) || // every symbol should be more or equal to min value
            (isNaN(elem) && isNaN(arrayedMin[index])) || // '.' elements
            (elem !== undefined && arrayedMin[index] === undefined)
          ) // if arrayedComparingValue longer than arrayedMin
        )
      ) {
        return false;
      }
      index += 1;
    }
  }; */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reg = getRegex();
    const inputValue = e.target.value;
    if (
      (!Number.isNaN(inputValue) && reg.test(inputValue)) ||
      inputValue === '' ||
      (!positiveOnly && inputValue === '-')
    ) {
      /* if (max && min) {
        if (checkMin(inputValue) && new BigNumber(inputValue) <= new BigNumber(max)) onChange(e);
      } else if (max) {
        if (new BigNumber(inputValue) <= new BigNumber(max)) onChange(e);
      } else if (min) {
        if (checkMin(inputValue)) onChange(e);
      } else onChange(e); */
      if (max) {
        if (new BigNumber(inputValue) <= new BigNumber(max)) onChange(e);
      } else onChange(e);
    }
  };
  return (
    <Input
      id={id}
      value={value}
      className={className}
      size={size}
      suffix={suffix}
      type="text"
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      onBlur={onBlur}
    />
  );
};
export default InputNumber;
