// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
import CreateCollection, { ICreateCollection } from '../component';

export default observer(({ walletConnector, isSingle, getCollections }: any) => {
  const { modals } = useMst();
  const FormWithFormik = withFormik<any, ICreateCollection>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      img: '',
      tokenName: '',
      symbol: '',
      descr: '',
      shortUrl: '',
      preview: '',
      isLoading: false,
    }),
    validate: (values) => {
      const errors = validateForm({ values, notRequired: ['description', 'shortUrl'] });

      return errors;
    },

    handleSubmit: (values, { setFieldValue }) => {
      console.log(values);
      setFieldValue('isLoading', true);

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
            .sendTransaction(data)
            .then((res: any) => {
              formData.append('tx_hash', res.transactionHash);

              storeApi
                .saveCollection(formData)
                .then((result) => {
                  console.log(result, 'create collection');
                  setFieldValue('isLoading', false);
                  modals.createCollection.close();
                  modals.info.setMsg('Congrats you create your own NFT collection!', 'success');
                  getCollections();
                })
                .catch((err: any) => {
                  setFieldValue('isLoading', false);
                  modals.createCollection.close();
                  console.log(err, 'err');
                });
            })
            .catch((err: any) => {
              setFieldValue('isLoading', false);
              modals.createCollection.close();
              console.log(err, 'err');
            });
        })
        .catch((err) => {
          setFieldValue('isLoading', false);
          modals.createCollection.close();
          console.log(err, 'err');
        });
    },

    displayName: 'ChangePasswordForm',
  })(CreateCollection);
  return <FormWithFormik />;
});
