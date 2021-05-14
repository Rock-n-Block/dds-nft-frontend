// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
import CreateForm, { ICreateForm } from '../component';

export default observer(({ isSingle, walletConnector, collections }: any) => {
  const { modals } = useMst();
  const FormWithFormik = withFormik<any, ICreateForm>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      img: '',
      preview: '',
      putOnSale: true,
      instantSalePrice: false,
      unlockOncePurchased: false,
      instantSalePriceEth: '',
      digitalKey: '',
      tokenName: '',
      tokenDescr: '',
      tokenRoyalties: '',
      numberOfCopies: '',
      tokenProperties: [
        {
          size: '',
          amount: '',
        },
      ],
      isLoading: false,
      collectionId: '4',
    }),
    validate: (values) => {
      console.log(values);
      const notRequired: string[] = ['tokenDescr', 'preview', 'userImg'];
      if (!values.instantSalePrice && !notRequired.includes('instantSalePriceEth')) {
        notRequired.push('instantSalePriceEth');
      }
      if (!values.unlockOncePurchased && !notRequired.includes('digitalKey')) {
        notRequired.push('digitalKey');
      }
      if (isSingle) {
        notRequired.push('numberOfCopies');
      }
      const errors = validateForm({ values, notRequired });

      return errors;
    },

    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('media', values.img);
      formData.append('name', values.tokenName);
      formData.append('total_supply', isSingle ? '1' : values.numberOfCopies.toString());
      formData.append('description', values.tokenDescr);
      if (values.putOnSale) {
        formData.append('price', values.instantSalePriceEth.toString());
        formData.append('available', values.numberOfCopies.toString());
      } else {
        formData.append('available', '0');
      }
      formData.append('creator_royalty', values.tokenRoyalties.toString());
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');
      formData.append('collection', values.collectionId);
      formData.append('currency', 'ETH');
      formData.append('creator', localStorage.dds_token);

      if (values.tokenProperties[0].size) {
        const details: any = {};
        values.tokenProperties.forEach((item) => {
          if (item.size) {
            details[item.size] = item.amount;
          }
        });

        formData.append('details', details);
      }
      storeApi
        .createToken(formData)
        .then(({ data }) => {
          walletConnector.metamaskService
            .sendTransaction(data.initial_tx)
            .then((res: any) => {
              formData.append('internal_id', data.internal_id);
              formData.append('tx_hash', res.transactionHash);
              if (values.putOnSale) {
                formData.append('selling', values.putOnSale.toString());
              }

              storeApi
                .saveToken(formData)
                .then((result) => {
                  console.log(result, 'create');
                  setFieldValue('isLoading', false);
                  modals.success.setSuccessMsg('Congrats you create your own NFT!');
                })
                .catch((err: any) => {
                  setFieldValue('isLoading', false);
                  console.log(err, 'err');
                });
            })
            .catch((err: any) => {
              setFieldValue('isLoading', false);
              console.log(err, 'err');
            });
        })
        .catch((err) => {
          setFieldValue('isLoading', false);
          console.log(err, 'err');
        });
    },

    displayName: 'ChangePasswordForm',
  })(CreateForm);
  return <FormWithFormik isSingle={isSingle} collections={collections} />;
});
