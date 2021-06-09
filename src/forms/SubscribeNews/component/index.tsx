import React from 'react';
import { Form, Input } from 'antd';
import { FormikProps } from 'formik';

import ArrowImg from '../../../assets/img/icons/form-arrow.svg';
import { validateField } from '../../../utils/validate';

export interface ISubscribeNews {
  email: string;
}

const SubscribeNews: React.FC<FormikProps<ISubscribeNews>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form__sub" className="form__sub" layout="vertical">
      <Form.Item
        name="email"
        className="form__sub-item input__field"
        validateStatus={validateField('email', touched, errors)}
        help={!touched.email ? false : errors.email}
      >
        <div className="form__sub-wrapper">
          <Input
            id="email"
            className="form__sub-input input text-regular"
            size="large"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div
            onClick={onSubmit}
            onKeyDown={onSubmit}
            role="button"
            tabIndex={0}
            className="form__sub-btn"
          >
            <img src={ArrowImg} alt="" />
          </div>
        </div>
      </Form.Item>
      {/* <button onClick={handleSubmit}>save PASSWORD</button> */}
    </Form>
  );
};

export default SubscribeNews;
