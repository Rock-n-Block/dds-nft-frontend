import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import SaleTimedAuction, { ISaleTimedAuction } from '../component';

const SaleTimedAuctionForm: React.FC = () => {
  const FormWithFormik = withFormik<any, ISaleTimedAuction>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        minimumBid: '',
      };
    },
    validate: (values) => {
      const errors = validateForm({ values });
      return errors;
    },
    handleSubmit: (values) => {
      console.log('submit sale timed auction', values);
    },
    displayName: 'SaleTimedAuction',
  })(SaleTimedAuction);
  return <FormWithFormik />;
};

export default observer(SaleTimedAuctionForm);
