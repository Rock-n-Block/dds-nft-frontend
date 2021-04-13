// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';

import { validateForm } from '../../../utils/validate';
import CreateCollection, { ICreateCollection } from '../component';
import { storeApi } from '../../../services/api';

export default ({ walletConnector, isSingle }: any) => {
  const FormWithFormik = withFormik<any, ICreateCollection>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      img: '',
      tokenName: '',
      symbol: '',
      descr: '',
      shortUrl: '',
      preview: '',
    }),
    validate: (values) => {
      const errors = validateForm({ values, notRequired: ['description', 'shortUrl'] });

      return errors;
    },

    handleSubmit: (values) => {
      console.log(values);

      const formData = new FormData();

      formData.append('name', values.tokenName);
      formData.append('avatar', values.img);
      formData.append('symbol', values.symbol);
      formData.append('creator', localStorage.dds_token);
      formData.append('standart', isSingle ? 'ERC721' : 'ERC1155');

      if (values.descr) {
        formData.append('description', values.descr);
      }
      if (values.shortUrl) {
        formData.append('short_url', values.shortUrl);
      }

      storeApi
        .createCollection(formData)
        .then(({ data }) => {
          walletConnector.metamaskService
            .sendTransaction(data.initial_tx)
            .then((res: any) => {
              formData.append('tx_hash', res.transactionHash);
              formData.append('avatar', values.img);

              storeApi
                .saveCollection(formData)
                .then((result) => {
                  console.log(result, 'create collection');
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
  })(CreateCollection);
  return <FormWithFormik />;
};
