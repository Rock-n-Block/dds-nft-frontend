import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import SaleFixedPrice, { ISaleFixedPrice } from '../component';
import { storeApi } from '../../../services/api';

interface SaleFixedPriceFormProps {
  fee: number;
  totalSupply: number;
  tokenId: number;
  handleSetTokenData: (data: any) => void;
}

const SaleFixedPriceForm: React.FC<SaleFixedPriceFormProps> = ({
  fee,
  totalSupply,
  tokenId,
  handleSetTokenData,
}) => {
  const FormWithFormik = withFormik<any, ISaleFixedPrice>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        instantSalePriceEth: '',
        fee: 0 || fee,
        // copies: 1,
        totalSupply,
        isLoading: false,
      };
    },
    validate: (values) => {
      const notRequired: string[] = [];
      const errors = validateForm({ values, notRequired });
      return errors;
    },
    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);
      storeApi
        .putOnSale(tokenId, +values.instantSalePriceEth)
        .then(({ data }) => {
          handleSetTokenData(data);
          setFieldValue('isLoading', false);
        })
        .catch((err) => {
          console.log(err, 'put on sale fixed price');
          setFieldValue('isLoading', false);
        });
    },
    displayName: 'SaleFixedPrice',
  })(SaleFixedPrice);
  return <FormWithFormik />;
};

export default observer(SaleFixedPriceForm);
