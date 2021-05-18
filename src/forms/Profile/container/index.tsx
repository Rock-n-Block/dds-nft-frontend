import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateForm } from '../../../utils/validate';
import Profile, { IProfile } from '../component';

const ChangePasswordForm: React.FC = () => {
  const { modals, user } = useMst();
  console.log(user.display_name, 'user name');

  const FormWithFormik = withFormik<any, IProfile>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        displayName: user.display_name || '',
        customUrl: user.custom_url || '',
        bio: user.bio || '',
        twitter: user.twitter || '',
        instagram: user.instagram || '',
        site: user.site || '',
        img: '',
        preview: `https://${user.avatar}` || '',
        isLoading: false,
      };
    },
    validate: (values) => {
      const errors = validateForm({
        values,
        notRequired: [
          'displayName',
          'customUrl',
          'bio',
          'twitter',
          'instagram',
          'site',
          'img',
          'preview',
        ],
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
      formData.append('site', values.site ? values.site : '');

      userApi
        .update(formData)
        .then(({ data }) => {
          user.update(data);
          setFieldValue('isLoading', false);
          modals.success.setSuccessMsg('Congrats you successfully changed your profile');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    displayName: 'IProfile',
  })(Profile);
  return <FormWithFormik />;
};

export default observer(ChangePasswordForm);
