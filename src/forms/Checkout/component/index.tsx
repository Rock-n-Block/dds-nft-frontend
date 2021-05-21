import React from 'react';
import { Form } from 'antd';
import { FormikProps } from 'formik';

import { Button, InputNumber } from '../../../components/atoms';
import { validateField } from '../../../utils/validate';

export interface ICheckout {
  quantity: number;
  available: number;
}

const Checkout: React.FC<FormikProps<ICheckout> | any> = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  touched,
  errors,
  isLoading,
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
          <InputNumber
            id="quantity"
            value={values.quantity}
            className="form-auction__input input input__create text-bold text-smd"
            size="large"
            placeholder="1"
            onChange={handleChange}
            onBlur={handleBlur}
            integer
            positiveOnly
            max={values.available}
          />
        </div>
      </Form.Item>
      <Button
        colorScheme="gradient"
        size="md"
        disabled={values.quantity > values.available || !values.quantity}
        onClick={onSubmit}
        loading={isLoading}
        className="form-auction__submit-btn"
      >
        Proceed to payment
      </Button>
    </Form>
  );
};

export default Checkout;
