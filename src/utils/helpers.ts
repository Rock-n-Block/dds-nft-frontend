import { ChangeEvent } from 'react';

export const handlePositiveNumberInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  eventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  const { value } = e.target;
  const reg = /^[+]?([.]\d+|\d+[.]?\d*)$/;
  if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
    eventHandler(e);
  }
};
