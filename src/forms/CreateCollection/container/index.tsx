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

export default observer(({ walletConnector, isSingle }: any) => {
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
      const errors = validateForm({ values, notRequired: ['description', 'shortUrl', 'img'] });

      return errors;
    },

    handleSubmit: (values, { setFieldValue, setFieldError }) => {
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
                  modals.createCollection.close();
                  console.log(result, 'create collection');
                  modals.info.setMsg(
                    'Congrats you created your own NFT collection! It will be added soon.',
                    'success',
                  );
                })
                .catch((err: any) => {
                  modals.info.setMsg('An error occurred while creating the collection', 'error');
                  console.log(err, 'err');
                })
                .finally(() => {
                  setFieldValue('isLoading', false);
                });
            })
            .catch((err: any) => {
              console.log(err, 'err');
            })
            .finally(() => {
              setFieldValue('isLoading', false);
            });
        })
        .catch(({ response }) => {
          if (response.data.name) {
            setFieldError('tokenName', response.data.name);
          }
        })
        .finally(() => {
          setFieldValue('isLoading', false);
        });
    },

    displayName: 'CreateCollectionForm',
  })(CreateCollection);
  return <FormWithFormik />;
});
