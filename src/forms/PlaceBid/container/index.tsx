import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { storeApi } from '../../../services/api';
import Wep3Provider from '../../../services/web3';
import { validateForm } from '../../../utils/validate';
import PlaceBid, { IPlaceBid } from '../component';
import { useMst } from '../../../store/store';
import { useWalletConnectorContext } from '../../../services/walletConnect';

interface PlaceBidFormProps {
  balance?: { value: string; currency: string };
  fee?: { value: string; currency: string };
  total?: { value: string; currency: string };
  available?: number;
  tokenId: string | number;
}

const PlaceBidForm: React.FC<PlaceBidFormProps> = ({ balance, fee, available, tokenId }) => {
  const { modals } = useMst();
  const connector = useWalletConnectorContext();
  const FormWithFormik = withFormik<any, IPlaceBid>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        bid: '',
        quantity: '',
        balance: balance ?? { value: '', currency: '' },
        fee: fee ?? { value: '', currency: '' },
        available: available || 0,
        isLoading: false,
      };
    },
    validate: (values) => {
      const notRequired: string[] = [];
      if (available === 1) {
        notRequired.push('quantity');
      }
      const errors = validateForm({ values, notRequired });
      return errors;
    },
    handleSubmit: async (values, { setFieldValue }) => {
      try {
        setFieldValue('isLoading', true);
        const { data }: any = await storeApi.createBid(
          tokenId,
          Wep3Provider.calcTransactionAmount(values.bid, 18),
          available === 1 ? '1' : values.quantity,
        );
        if (data.initial_tx) {
          await connector.metamaskService.sendTransaction(data.initial_tx);
        }
        if (modals.auction.isRefreshPage) {
          window.location.reload();
        }
        modals.auction.close();
        modals.info.setMsg('Congratulations', 'success');
        setFieldValue('isLoading', false);
      } catch (err) {
        setFieldValue('isLoading', false);
        modals.auction.close();
        modals.info.setMsg('Something went wrong', 'error');
      }
    },
    displayName: 'PlaceBid',
  })(PlaceBid);
  return <FormWithFormik />;
};

export default observer(PlaceBidForm);
