import React from 'react';
import { Form } from 'antd';
import BigNumber from 'bignumber.js/bignumber';
import { FormikProps } from 'formik';

import { Button, InputNumber } from '../../../components/atoms';
import { validateField } from '../../../utils/validate';

export interface IPlaceBid {
  bid: string;
  quantity: string;
  balance: { value: string; currency: string };
  fee: { value: string; currency: string };
  available: number;
  isLoading: boolean;
  min: number;
}

const PlaceBid: React.FC<FormikProps<IPlaceBid>> = ({
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
        name="bid"
        className="form-auction__item input__field"
        initialValue={values.bid}
        validateStatus={validateField('bid', touched, errors)}
        help={!touched.bid ? '' : errors.bid}
        label={<span className="input__label text-bold">Your bid</span>}
      >
        <div className="input__field-create box-shadow">
          <InputNumber
            id="bid"
            value={values.bid}
            suffix="WETH"
            className="form-auction__input input input__create text-bold text-smd"
            size="large"
            placeholder="Enter bid"
            onChange={handleChange}
            onBlur={handleBlur}
            positiveOnly
            max={+values.balance.value}
          />
        </div>
      </Form.Item>
      {values.available > 1 ? (
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
              positiveOnly
            />
          </div>
        </Form.Item>
      ) : (
        ''
      )}
      <div className="form-auction__overview">
        <p className="form-auction__overview-item text text-bold">
          <span className="text-gray-l">Minimal bid</span>
          <span className="text-pink-l">{values.min} WETH</span>
        </p>
        <p className="form-auction__overview-item text text-bold">
          <span className="text-gray-l">Your balance </span>
          <span className="text-pink-l">
            {values.balance.value ? values.balance.value : '0.0'}{' '}
            {values.balance.currency ? values.balance.currency : 'ETH'}
          </span>
        </p>
        <p className="form-auction__overview-item text text-bold">
          <span className="text-gray-l">Service fee </span>
          <span className="text-pink-l">
            {values.fee.value ? values.fee.value : '0.0'}{' '}
            {values.fee.currency ? values.fee.currency : 'ETH'}
          </span>
        </p>
        <p className="form-auction__overview-item text text-bold">
          <span className="text-gray-l">Total bid amount </span>
          <span className="text-pink-l">
            {values.bid
              ? new BigNumber(values.bid)
                  .plus(
                    new BigNumber(values.bid).times(new BigNumber(values.fee.value).dividedBy(100)),
                  )
                  .toFixed()
              : 0}{' '}
            WETH
          </span>
        </p>
      </div>
      <Button
        colorScheme="gradient"
        size="md"
        onClick={onSubmit}
        disabled={+values.bid < values.min || +values.quantity > +values.available}
        className="form-auction__submit-btn"
        loading={values.isLoading}
      >
        Place a bid
      </Button>
    </Form>
  );
};

export default PlaceBid;
