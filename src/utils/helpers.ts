import { ChangeEvent } from 'react';

export const handlePositiveFloatInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  eventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  const { value } = e.target;
  const reg = /^[+]?([.]\d+|\d+[.]?\d*)$/;
  if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
    eventHandler(e);
  }
};
export const handlePositiveIntegerInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  eventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  const { value } = e.target;
  const reg = /^[+]?\d+([.]\d+)?$/;
  if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
    eventHandler(e);
  }
};
