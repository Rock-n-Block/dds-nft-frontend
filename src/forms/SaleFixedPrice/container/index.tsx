import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import SaleFixedPrice, { ISaleFixedPrice } from '../component';
import { storeApi } from '../../../services/api';
import { useMst } from '../../../store/store';

interface SaleFixedPriceFormProps {
  fee: number;
  totalSupply: number;
  tokenId: number;
  handleSetTokenData: (data: any) => void;
  handleApproveNft: () => {};
}

const SaleFixedPriceForm: React.FC<SaleFixedPriceFormProps> = ({
  fee,
  totalSupply,
  tokenId,
  handleSetTokenData,
  handleApproveNft,
}) => {
  const { modals } = useMst();
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
        .putOnSale(tokenId, +values.instantSalePriceEth)
        .then(({ data }) => {
          modals.closeAll();
          handleSetTokenData(data);
          modals.info.setMsg('Congratulations', 'success');
        })
        .catch((err) => {
          modals.info.setMsg('Something went wrong', 'error');
          console.log(err, 'put on sale fixed price');
        })
        .finally(() => {
          setFieldValue('isLoading', false);
          modals.putOnSale.close();
        });
    },
    displayName: 'SaleFixedPrice',
  })(SaleFixedPrice);
  return <FormWithFormik />;
};

export default observer(SaleFixedPriceForm);
