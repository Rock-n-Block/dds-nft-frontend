import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import PlaceBid, { IPlaceBid } from '../component';

interface PlaceBidFormProps {
  balance?: { value: string; currency: string };
  fee?: { value: string; currency: string };
  total?: { value: string; currency: string };
}

const PlaceBidForm: React.FC<PlaceBidFormProps> = ({ balance, fee, total }) => {
  const FormWithFormik = withFormik<any, IPlaceBid>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        bid: { value: '', currency: '' },
        quantity: '',
        balance: balance ?? { value: '', currency: '' },
        fee: fee ?? { value: '', currency: '' },
        total: total ?? { value: '', currency: '' },
      };
    },
    validate: (values) => {
      const errors = validateForm({ values });
      return errors;
    },
    handleSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append('bid', values.bid.value);
      formData.append('currency', values.bid.currency);
      formData.append('quantity', values.quantity);
    },
    displayName: 'PlaceBid',
  })(PlaceBid);
  return <FormWithFormik />;
};

export default observer(PlaceBidForm);
