import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import PlaceBid, { IPlaceBid } from '../component';
import { storeApi } from '../../../services/api';
import Wep3Provider from '../../../services/web3';

interface PlaceBidFormProps {
  balance?: { value: string; currency: string };
  fee?: { value: string; currency: string };
  total?: { value: string; currency: string };
  available?: number;
  tokenId: string;
}

const PlaceBidForm: React.FC<PlaceBidFormProps> = ({ balance, fee, available, tokenId }) => {
  console.log(balance, 'balance');
  const FormWithFormik = withFormik<any, IPlaceBid>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        bid: '',
        quantity: '',
        balance: balance ?? { value: '', currency: '' },
        fee: fee ?? { value: '', currency: '' },
        available: available || 0,
      };
    },
    validate: (values) => {
      const errors = validateForm({ values });
      return errors;
    },
    handleSubmit: (values) => {
      storeApi
        .createBid(
          tokenId,
          Wep3Provider.calcTransactionAmount(values.bid, 18),
          available === 1 ? '1' : values.quantity,
        )
        .then((res: any) => {
          console.log(res, 'bid');
        })
        .catch((err: any) => {
          console.log(err, 'bid');
        });
    },
    displayName: 'PlaceBid',
  })(PlaceBid);
  return <FormWithFormik />;
};

export default observer(PlaceBidForm);
