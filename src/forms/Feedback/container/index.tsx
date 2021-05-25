import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';

import { storeApi } from '../../../services/api';
import { validateForm } from '../../../utils/validate';
import { useMst } from '../../../store/store';
import FeedBack, { IFeedBack } from '../component';

const FeedBackForm: React.FC = () => {
  const { modals } = useMst();
  const FormWithFormik = withFormik<any, IFeedBack>({
    enableReinitialize: true,
    mapPropsToValues: () => {
      return {
        email: '',
        message: '',
        token: '',
        isLoading: false,
      };
    },
    validate: (values) => {
      const notRequired: string[] = [];
      const errors = validateForm({ values, notRequired });
      return errors;
    },
    handleSubmit: (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);

      storeApi
        .support(values.email, values.message, values.token)
        .then(() => {
          modals.info.setMsg('Your request has been successfully submitted', 'success');
        })
        .catch(() => {
          modals.info.setMsg('Something went wrong', 'error');
        })
        .finally(() => {
          setFieldValue('isLoading', false);
        });
    },
    displayName: 'FeedBack',
  })(FeedBack);
  return <FormWithFormik />;
};

export default observer(FeedBackForm);
