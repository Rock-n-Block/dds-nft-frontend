// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';

import { validateForm } from '../../../utils/validate';
import CreateForm, { ICreateForm } from '../component';

export default ({ isSingle }: any) => {
  const FormWithFormik = withFormik<any, ICreateForm>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      img: '',
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
      const notRequired: string[] = ['tokenDescr'];
      if (!values.instantSalePrice && !notRequired.includes('instantSalePriceEth')) {
        notRequired.push('instantSalePriceEth');
      }
      if (!values.unlockOncePurchased && !notRequired.includes('digitalKey')) {
        notRequired.push('digitalKey');
      }
      const errors = validateForm({ values, notRequired });

      return errors;
    },

    handleSubmit: (values) => {
      console.log(values);
    },

    displayName: 'ChangePasswordForm',
  })(CreateForm);
  return <FormWithFormik isSingle={isSingle} />;
};
