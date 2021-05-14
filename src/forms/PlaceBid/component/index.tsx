import React from 'react';
import { Form, Input } from 'antd';
import BigNumber from 'bignumber.js/bignumber';
import { FormikProps } from 'formik';

import { Button } from '../../../components/atoms';

export interface IPlaceBid {
  bid: string;
  quantity: string;
  balance: { value: string; currency: string };
  fee: { value: string; currency: string };
  available: number;
}

const PlaceBid: React.FC<FormikProps<IPlaceBid>> = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form-auction" className="form-auction" layout="vertical">
      <Form.Item
        name="bid.value"
        className="form-auction__item input__field"
        initialValue={values.bid}
        label={<span className="input__label text-bold">Your bid</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="bid"
            value={values.bid}
            suffix="WETH"
            className="form-auction__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="Enter bid"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Form.Item>
      {values.available > 1 ? (
        <Form.Item
          name="quantity"
          className="form-auction__item input__field"
          initialValue={values.quantity}
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
      ) : (
        ''
      )}
      <div className="form-auction__overview">
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
        className="form-auction__submit-btn"
      >
        Place a bid
      </Button>
    </Form>
  );
};

export default PlaceBid;
