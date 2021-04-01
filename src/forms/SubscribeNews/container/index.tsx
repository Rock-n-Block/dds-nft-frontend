import React from 'react';
import { withFormik } from 'formik';

import { validateForm } from '../../../utils/validate';
import SubscribeNews, { ISubscribeNews } from '../component';

export default () => {
  const FormWithFormik = withFormik<any, ISubscribeNews>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      email: '',
    }),
    validate: (values) => {
      const errors = validateForm({ values, notRequired: [] });

      return errors;
    },

    handleSubmit: (values) => {
      console.log(values);
    },

    displayName: 'ChangePasswordForm',
  })(SubscribeNews);
  return <FormWithFormik />;
};
