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

  const props: IVerifyForm = {
    role: 'creator',
    about: user.bio || '',
    videoLink: '',
    twitter: user.twitter || '',
    instagram: user.instagram || '',
    website: user.site || '',
    email: '',
    isLoading: false,
  };

  const FormWithFormik = withFormik<any, IVerifyForm>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validate: (values) => {
      const notRequired: string[] = ['twitter', 'instagram', 'website'];
      const errors = validateForm({ values, notRequired });
      return errors;
    },
    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);

      const formData = new FormData();
      formData.append('auth_token', localStorage.dds_token);
      formData.append('address', user.address);
      formData.append('role', values.role.toUpperCase());
      formData.append('bio', values.about);
      formData.append('media', values.videoLink);
      formData.append('twitter', values.twitter);
      formData.append('instagram', values.instagram);
      formData.append('website', values.website);
      formData.append('email', values.email);

      userApi
        .verifyMe(formData)
        .then(() => {
          modals.info.setMsg(
            'Congrats you have successfully submitted a verification request ',
            'success',
          );
        })
        .catch((err: any) => {
          if (err.message === 'Request failed with status code 400') {
            modals.info.setMsg(`Your verification already in progress`, 'error');
          } else {
            modals.info.setMsg(err.message, 'error');
          }
          console.log(err.message);
        })
        .finally(() => {
          setFieldValue('isLoading', false);
          modals.verify.close();
        });
    },
    displayName: 'VerifyUserForm',
  })(VerifyForm);
  return <FormWithFormik />;
});
