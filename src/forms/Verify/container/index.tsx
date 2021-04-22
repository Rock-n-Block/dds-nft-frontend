// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { validateForm } from '../../../utils/validate';
import VerifyForm, { IVerifyForm } from '../component';

export default observer(() => {
  const FormWithFormik = withFormik<any, IVerifyForm>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      displayName: '',
      userType: 'creator',
      about: '',
      img: '',
      twitter: '',
      instagram: '',
      website: '',
      email: '',
      isLoading: false,
    }),
    validate: (values) => {
      const notRequired: string[] = ['twitter', 'instagram', 'website'];
      const errors = validateForm({ values, notRequired });
      return errors;
    },
    handleSubmit: (values, { setFieldValue }) => {
      console.log(values);
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('name', values.displayName);
      formData.append('user_type', values.userType);
      formData.append('about', values.about);
      formData.append('img', values.img);
      formData.append('twitter', values.twitter);
      formData.append('instagram', values.instagram);
      formData.append('website', values.website);
      formData.append('email', values.email);
    },
    displayName: 'VerifyUserForm',
  })(VerifyForm);
  return <FormWithFormik />;
});
