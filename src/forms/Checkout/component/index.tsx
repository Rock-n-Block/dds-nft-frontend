import React from 'react';
import { Form, Input } from 'antd';
import { FormikProps } from 'formik';

import { Button } from '../../../components/atoms';
import { validateField } from '../../../utils/validate';

export interface ICheckout {
  quantity: number;
  available: number;
}

const Checkout: React.FC<FormikProps<ICheckout>> = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  touched,
  errors,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form-auction" className="form-auction" layout="vertical">
      <Form.Item
        name="quantity"
        className="form-auction__item input__field"
        initialValue={values.quantity}
        validateStatus={validateField('quantity', touched, errors)}
        help={!touched.quantity ? '' : errors.quantity}
        label={
          <span className="input__label text-bold">
            Enter quantity ({values.available} available)
          </span>
        }
      >
        <div className="input__field-create box-shadow">
          <Input
            id="quantity"
            value={values.quantity}
            className="form-auction__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="1"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Form.Item>
      <Button
        colorScheme="gradient"
        size="md"
        disabled={values.quantity > values.available || !values.quantity}
        onClick={onSubmit}
        className="form-auction__submit-btn"
      >
        Proceed to payment
      </Button>
    </Form>
  );
};

export default Checkout;
