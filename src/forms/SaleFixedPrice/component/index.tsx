import React from 'react';
import { Form } from 'antd';
import { FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';

import { Button, InputNumber } from '../../../components/atoms';
import { validateField } from '../../../utils/validate';
import { useMst } from '../../../store/store';

export interface ISaleFixedPrice {
  instantSalePriceEth: string;
  fee: number;
  // copies: number;
  totalSupply: number;
  isLoading: boolean;
}

const SaleFixedPrice: React.FC<FormikProps<ISaleFixedPrice>> = observer(
  ({ handleChange, handleBlur, values, handleSubmit, touched, errors }) => {
    const { modals } = useMst();
    const onSubmit = () => {
      handleSubmit();
    };
    const onCancel = () => {
      modals.fixedPrice.close();
    };
    return (
      <Form name="form-sale-fixed-price" className="form-sale-fixed-price" layout="vertical">
        <Form.Item
          name="instantSalePriceEth"
          className="form-sale-fixed-price__item input__field"
          initialValue={values.instantSalePriceEth}
          label={<span className="input__label text-bold">Enter price for one piece</span>}
          validateStatus={validateField('instantSalePriceEth', touched, errors)}
          help={!touched.instantSalePriceEth ? '' : errors.instantSalePriceEth}
        >
          <div className="input__field-create box-shadow">
            <InputNumber
              id="instantSalePriceEth"
              value={values.instantSalePriceEth}
              suffix="WETH"
              className="form-sale-fixed-price__input input input__create text-bold text-smd"
              size="large"
              placeholder="Enter price"
              onChange={handleChange}
              onBlur={handleBlur}
              positiveOnly
            />
          </div>
        </Form.Item>
        <section className="form-sale-fixed-price__fee text text-bold text-gray-l">
          {/* TODO: add service fee */}
          <p>
            Service fee <span className="text-pink-l">{values.fee}%</span>
          </p>
          <p>
            You will receive <span className="text-pink-l">0 ETH </span>$0.00
          </p>
        </section>
        {/* <Form.Item
          name="number of copies"
          className="form-sale-fixed-price__item input__field"
          initialValue={values.copies}
          label={<span className="input__label text-bold">Number of copies</span>}
        >
          <div className="input__field-create box-shadow">
            <Input
              id="copies"
              value={values.copies}
              className="form-sale-fixed-price__input input input__create text-bold text-smd"
              size="large"
              type="text"
              placeholder="Enter number of copies"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </Form.Item> */}
        {/* <p className="form-sale-fixed-price__ammount text text-bold text-gray-l">
          Amount of tokens <span className="text-pink-l">{values.totalSupply}</span>
        </p> */}
        <div className="form-sale-fixed-price__btns">
          <Button
            colorScheme="gradient"
            shadow
            size="md"
            onClick={onSubmit}
            className="form-sale-fixed-price__submit-btn"
            loading={values.isLoading}
          >
            Put on sale
          </Button>
          <Button
            colorScheme="white"
            shadow
            size="md"
            onClick={onCancel}
            className="form-sale-fixed-price__cancel-btn "
          >
            <span className="text-grad">Cancel</span>
          </Button>
        </div>
      </Form>
    );
  },
);
export default SaleFixedPrice;
