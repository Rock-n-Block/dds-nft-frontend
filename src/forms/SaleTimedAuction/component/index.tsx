import React from 'react';
import { FormikProps } from 'formik';
import { Form, Input } from 'antd';
import { Button } from '../../../components/atoms';

export interface ISaleTimedAuction {
  minimumBid: string;
}

const SaleTimedAuction: React.FC<FormikProps<ISaleTimedAuction>> = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form-sale-timed-auction" className="form-sale-timed-auction" layout="vertical">
      <Form.Item
        name="bid value"
        className="form-sale-timed-auction__item input__field"
        initialValue={values.minimumBid}
        label={<span className="input__label text-bold">Enter price for one piece</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="minimum-bid"
            value={values.minimumBid}
            suffix="WETH"
            className="form-sale-timed-auction__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="Enter minimum bid"
            onChange={handleChange}
            onBlur={handleBlur}
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
