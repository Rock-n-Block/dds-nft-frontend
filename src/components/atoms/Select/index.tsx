import React from 'react';
import { Select as SelectAntd } from 'antd';

const { Option } = SelectAntd;

interface SelectProps {
  options: Array<string>;
  onChange?: () => void;
}
const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <SelectAntd defaultValue={options[0]} onChange={onChange} className="select">
      {options.map((option) => (
        <Option value={option}>{option.toUpperCase()}</Option>
      ))}
    </SelectAntd>
  );
};

export default Select;
