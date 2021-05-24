import React from 'react';
import { Form, Input } from 'antd';
import { FormikProps } from 'formik';

import { Button } from '../../../components/atoms';
import { validateField } from '../../../utils/validate';

const { TextArea } = Input;

export interface IFeedBack {
  email: string;
  message: string;
  isLoading?: boolean;
}
const FeedBack: React.FC<FormikProps<IFeedBack>> = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  touched,
  errors,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form-feedback" className="form-feedback" layout="vertical">
      <Form.Item
        name="email"
        className="form-feedback__item input__field"
        validateStatus={validateField('email', touched, errors)}
        help={!touched.email ? '' : errors.email}
        label={<span className="input__label text-bold">Your E-mail</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="email"
            value={values.email}
            className="form-feedback__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="Enter your E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="message"
        className="form-feedback__item input__field"
        label={<span className="input__label text-bold">Message</span>}
      >
        <div className="input__field-create box-shadow">
          <TextArea
            id="message"
            value={values.message}
            className="form-feedback__input input input__create text-bold text-smd"
            size="large"
            placeholder="Write us a message"
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
          />
        </div>
      </Form.Item>
      <Button
        colorScheme="gradient"
        size="md"
        onClick={onSubmit}
        className="form-feedback__submit-btn"
        loading={values.isLoading}
      >
        Send
      </Button>
    </Form>
  );
};

export default FeedBack;
