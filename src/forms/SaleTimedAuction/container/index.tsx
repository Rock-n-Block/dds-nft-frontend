import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import SaleTimedAuction, { ISaleTimedAuction } from '../component';
import { storeApi } from '../../../services/api';
import { useMst } from '../../../store/store';

interface SaleTimedAuctionFormProps {
  tokenId: number;
  handleSetTokenData: (data: any) => void;
  handleApproveNft: () => {};
}

const SaleTimedAuctionForm: React.FC<SaleTimedAuctionFormProps> = ({
  tokenId,
  handleSetTokenData,
  handleApproveNft,
}) => {
  const { modals } = useMst();
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
    handleSubmit: async (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);
      try {
        await handleApproveNft();
      } catch (err) {
        modals.info.setMsg('Something went wrong', 'error');
        setFieldValue('isLoading', false);
        return;
      }
      storeApi
        .putOnSale(tokenId, 0, +values.bid)
        .then(({ data }) => {
          handleSetTokenData(data);
          modals.closeAll();
          modals.info.setMsg('Congratulations', 'success');
          setFieldValue('isLoading', false);
        })
        .catch((err) => {
          console.log(err, 'put on sale fixed price');
          modals.info.setMsg('Something went wrong', 'error');
          setFieldValue('isLoading', false);
        });
    },
    displayName: 'SaleTimedAuction',
  })(SaleTimedAuction);
  return <FormWithFormik />;
};

export default observer(SaleTimedAuctionForm);
