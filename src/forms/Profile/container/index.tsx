// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

// import { storeApi } from '../../../services/api';
import { validateForm } from '../../../utils/validate';
import Profile, { IProfile } from '../component';
// import { useMst } from '../../../store/store';

export default observer(() => {
  // const { modals } = useMst();
  const FormWithFormik = withFormik<any, IProfile>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      displayName: '',
      customUrl: '',
      bio: '',
      twitter: '',
      img: '',
      preview: '',
    }),
    validate: (values) => {
      const errors = validateForm({ values, notRequired: ['displayName'] });

      return errors;
    },

    handleSubmit: (values) => {
      console.log(values);
    },

    displayName: 'ChangePasswordForm',
  })(Profile);
  return <FormWithFormik />;
});
