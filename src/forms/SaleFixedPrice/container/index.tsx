import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import SaleFixedPrice, { ISaleFixedPrice } from '../component';

interface SaleFixedPriceFormProps {
  fee: number;
  totalSupply: number;
}

const SaleFixedPriceForm: React.FC<SaleFixedPriceFormProps> = ({ fee, totalSupply }) => {
  const FormWithFormik = withFormik<any, ISaleFixedPrice>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        bid: '',
        fee: 0 || fee,
        copies: 1,
        totalSupply,
      };
    },
    validate: (values) => {
      const errors = validateForm({ values });
      return errors;
    },
    handleSubmit: (values) => {
      console.log('submit sale at fixed price', values);
    },
    displayName: 'SaleFixedPrice',
  })(SaleFixedPrice);
  return <FormWithFormik />;
};

export default observer(SaleFixedPriceForm);
