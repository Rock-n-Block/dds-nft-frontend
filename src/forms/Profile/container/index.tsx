import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { validateForm } from '../../../utils/validate';
import Profile, { IProfile } from '../component';
import { useMst } from '../../../store/store';

const ChangePasswordForm: React.FC = () => {
  const { user } = useMst();
  console.log(user.display_name, 'user name');

  const FormWithFormik = withFormik<any, IProfile>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        displayName: user.display_name || '',
        customUrl: user.custom_url || '',
        bio: user.bio || '',
        twitter: user.twitter || '',
        img: '',
        preview: user.avatar || '',
      };
    },
    validate: (values) => {
      const errors = validateForm({ values, notRequired: ['displayName'] });

      return errors;
    },

    handleSubmit: (values) => {
      console.log(values);
      console.log(user);
    },

    displayName: 'IProfile',
  })(Profile);
  return <FormWithFormik />;
};

export default observer(ChangePasswordForm);
