// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { useHistory } from 'react-router-dom';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
import CreateForm, { ICreateForm } from '../component';

export default observer(({ isSingle, walletConnector, ethRate }: any) => {
  const { modals } = useMst();
  const history = useHistory();
  const FormWithFormik = withFormik<any, ICreateForm>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      img: '',
      preview: '',
      putOnSale: true,
      instantSalePrice: false,
      // unlockOncePurchased: false,
      instantSalePriceEth: '',
      // digitalKey: '',
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
      ethRate: ethRate || 0,
      bid: '',
    }),
    validate: (values) => {
      const notRequired: string[] = ['tokenDescr', 'preview'];
      if (
        !values.putOnSale ||
        (!values.instantSalePrice && !notRequired.includes('instantSalePriceEth'))
      ) {
        notRequired.push('instantSalePriceEth');
      } /*
      if (!values.unlockOncePurchased && !notRequired.includes('digitalKey')) {
        notRequired.push('digitalKey');
      } */
      if (isSingle) {
        notRequired.push('numberOfCopies');
      }
      if (!values.putOnSale || values.instantSalePrice) {
        notRequired.push('bid');
      }
      const errors = validateForm({ values, notRequired });

      return errors;
    },

    handleSubmit: (values, { setFieldValue, setFieldError }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('media', values.img);
      formData.append('name', values.tokenName);
      formData.append('total_supply', isSingle ? '1' : values.numberOfCopies.toString());
      formData.append('description', values.tokenDescr);
      if (values.instantSalePrice && values.putOnSale) {
        formData.append('price', values.instantSalePriceEth.toString());
      }
      if (!values.instantSalePrice && values.putOnSale) {
        formData.append('minimal_bid', values.bid.toString());
      }
      if (values.putOnSale) {
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
              formData.append('tx_hash', res.transactionHash);
              if (values.putOnSale) {
                formData.append('selling', values.putOnSale.toString());
              }

              storeApi
                .saveToken(formData)
                .then(({ data: tokendata }) => {
                  console.log(tokendata, 'create');
                  setFieldValue('isLoading', false);
                  history.push(`/token/${tokendata.id}`);
                  modals.info.setMsg('Congrats you create your own NFT!', 'success');
                })
                .catch((err: any) => {
                  modals.info.setMsg('Something went wrong', 'error');
                  setFieldValue('isLoading', false);
                  console.log(err, 'err');
                });
            })
            .catch((err: any) => {
              modals.info.setMsg('Something went wrong', 'error');
              setFieldValue('isLoading', false);
              console.log(err, 'err');
            });
        })
        .catch(({ response }) => {
          setFieldValue('isLoading', false);
          if (response.data && response.data.name) {
            setFieldError('tokenName', response.data.name);
          }
          if (response.data) {
            modals.info.setMsg(Object.values(response.data).join(', '), 'error');
          }
        });
    },

    displayName: 'ChangePasswordForm',
  })(CreateForm);
  return <FormWithFormik isSingle={isSingle} />;
});
