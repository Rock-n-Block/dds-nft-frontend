import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
import Profile, { IProfile } from '../component';

const ChangePasswordForm: React.FC = () => {
  const { modals, user } = useMst();

  const props: IProfile = {
    displayName: user.display_name || '',
    customUrl: user.custom_url || '',
    bio: user.bio || '',
    twitter: user.twitter || '',
    instagram: user.instagram || '',
    img: '',
    preview: `https://${user.avatar}` || '',
    isLoading: false,
  };
  const FormWithFormik = withFormik<any, IProfile>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validate: (values) => {
      const errors = validateForm({
        values,
        notRequired: ['displayName', 'customUrl', 'bio', 'twitter', 'instagram', 'img', 'preview'],
      });

      return errors;
    },

    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);
      const formData = new FormData();
      formData.append('avatar', values.img);
      formData.append('display_name', values.displayName ? values.displayName : '');
      formData.append('bio', values.bio ? values.bio : '');
      formData.append('custom_url', values.customUrl ? values.customUrl : '');
      formData.append('twitter', values.twitter ? values.twitter : '');
      formData.append('instagram', values.instagram ? values.instagram : '');

      userApi
        .update(formData)
        .then(({ data }) => {
          user.update(data);
          modals.info.setMsg('Congrats you successfully changed your profile', 'success');
        })
        .catch((err) => {
          modals.info.setMsg('Something went wrong', 'error');
          console.log(err);
        })
        .finally(() => {
          setFieldValue('isLoading', false);
        });
    },

    displayName: 'IProfile',
  })(Profile);
  return <FormWithFormik />;
};

export default observer(ChangePasswordForm);
