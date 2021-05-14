import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import Checkout, { ICheckout } from '../component';

interface CheckoutFormProps {
  available?: number;
  handleBuy: (quantity: number) => {};
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ available, handleBuy }) => {
  const FormWithFormik = withFormik<any, ICheckout>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        quantity: 1,
        available: available || 0,
      };
    },
    validate: (values) => {
      const errors = validateForm({ values, notRequired: [] });
      return errors;
    },
    handleSubmit: (values) => {
      handleBuy(values.quantity);
    },
    displayName: 'Checkout',
  })(Checkout);
  return <FormWithFormik />;
};

export default observer(CheckoutForm);
