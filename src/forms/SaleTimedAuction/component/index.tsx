import React from 'react';
import { Form } from 'antd';
import { FormikProps } from 'formik';

import { Button, InputNumber } from '../../../components/atoms';
import { validateField } from '../../../utils/validate';

export interface ISaleTimedAuction {
  bid: string;
  isLoading: boolean;
}

const SaleTimedAuction: React.FC<FormikProps<ISaleTimedAuction>> = ({
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
    <Form name="form-sale-timed-auction" className="form-sale-timed-auction" layout="vertical">
      <Form.Item
        name="bid"
        className="form-sale-timed-auction__item input__field"
        initialValue={values.bid}
        label={<span className="input__label text-bold">Enter price for one piece</span>}
        validateStatus={validateField('bid', touched, errors)}
        help={!touched.bid ? '' : errors.bid}
      >
        <div className="input__field-create box-shadow">
          <InputNumber
            id="bid"
            value={values.bid}
            suffix="WETH"
            className="form-sale-timed-auction__input input input__create text-bold text-smd"
            size="large"
            placeholder="Enter minimum bid"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0.001}
            positiveOnly
          />
        </div>
      </Form.Item>
      <p className="form-sale-timed-auction__description text text-bold text-gray-l">
        Bids below this amount won’t be accepted.
      </p>
      <p className="form-sale-timed-auction__comment text text-bold text-gray-l">
        Any bid placed in the last 10 minutes extends the auction by 10 minutes{' '}
      </p>
      <p className="form-sale-timed-auction__description text text-bold text-pink-l">
        Learn more how timed auctions work
      </p>
      <Button
        colorScheme="gradient"
        shadow
        loading={values.isLoading}
        size="md"
        onClick={onSubmit}
        className="form-sale-timed-auction__submit-btn"
      >
        Start auction
      </Button>
    </Form>
  );
};
export default SaleTimedAuction;
