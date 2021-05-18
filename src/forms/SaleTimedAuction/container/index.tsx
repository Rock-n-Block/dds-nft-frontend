import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import SaleTimedAuction, { ISaleTimedAuction } from '../component';
import { storeApi } from '../../../services/api';

interface SaleTimedAuctionFormProps {
  tokenId: number;
  handleSetTokenData: (data: any) => void;
}

const SaleTimedAuctionForm: React.FC<SaleTimedAuctionFormProps> = ({
  tokenId,
  handleSetTokenData,
}) => {
  const FormWithFormik = withFormik<any, ISaleTimedAuction>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        bid: '',
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
        .putOnSale(tokenId, 0, +values.bid)
        .then(({ data }) => {
          handleSetTokenData(data);
          setFieldValue('isLoading', false);
        })
        .catch((err) => {
          console.log(err, 'put on sale fixed price');
          setFieldValue('isLoading', false);
        });
    },
    displayName: 'SaleTimedAuction',
  })(SaleTimedAuction);
  return <FormWithFormik />;
};

export default observer(SaleTimedAuctionForm);
