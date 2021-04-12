// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';

import { storeApi } from '../../../services/api';
import { validateForm } from '../../../utils/validate';
import CreateForm, { ICreateForm } from '../component';

export default ({ isSingle, walletConnector }: any) => {
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
    }),
    validate: (values) => {
      const notRequired: string[] = ['tokenDescr', 'preview'];
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

    handleSubmit: (values) => {
      console.log(values);

      const formData = new FormData();
      formData.append('media', values.img);
      formData.append('name', values.tokenName);
      formData.append('total_supply', '1');
      formData.append('description', values.tokenDescr);
      formData.append('price', values.instantSalePriceEth.toString());
      formData.append('creator_royalty', values.tokenRoyalties.toString());
      formData.append('standart', 'ERC721');
      formData.append('collection', '4');
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
              formData.append('media', values.img);

              storeApi
                .saveToken(formData)
                .then((result) => {
                  console.log(result, 'create');
                })
                .catch((err: any) => {
                  console.log(err, 'err');
                });
            })
            .catch((err: any) => {
              console.log(err, 'err');
            });
        })
        .catch((err) => console.log(err, 'err'));
    },

    displayName: 'ChangePasswordForm',
  })(CreateForm);
  return <FormWithFormik isSingle={isSingle} />;
};