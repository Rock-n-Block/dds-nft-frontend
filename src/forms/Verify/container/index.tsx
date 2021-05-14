// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
import VerifyForm, { IVerifyForm } from '../component';

export default observer(() => {
  const { modals, user } = useMst();

  const FormWithFormik = withFormik<any, IVerifyForm>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      role: 'creator',
      about: user.bio || '',
      img: '',
      twitter: user.twitter || '',
      instagram: '',
      website: user.site || '',
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
      formData.append('auth_token', localStorage.dds_token);
      formData.append('address', user.address);
      formData.append('role', values.role.toUpperCase());
      formData.append('bio', values.about);
      formData.append('media', values.img);
      formData.append('twitter', values.twitter);
      formData.append('instagram', values.instagram);
      formData.append('website', values.website);
      formData.append('email', values.email);

      userApi
        .verifyMe(formData)
        .then(() => {
          setFieldValue('isLoading', false);
          modals.success.setSuccessMsg(
            'Congrats you have successfully submitted a verification request ',
          );
          modals.verify.close();
        })
        .catch((err) => {
          if (err.message === 'Request failed with status code 400') {
            setFieldValue('isLoading', false);
            modals.success.setSuccessMsg(`Your verification already in progress`);
          }
          console.log(err.message);
          modals.verify.close();
        });
    },
    displayName: 'VerifyUserForm',
  })(VerifyForm);
  return <FormWithFormik />;
});
