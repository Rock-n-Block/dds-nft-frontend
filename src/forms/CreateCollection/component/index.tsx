import React from 'react';
import { Form, Input } from 'antd';
import { FormikProps } from 'formik';

import { Button } from '../../../components/atoms';
import { Uploader } from '../../../components/organisms';
import { validateField } from '../../../utils/validate';

export interface ICreateCollection {
  img: any;
  tokenName: string;
  symbol: string;
  descr?: string;
  shortUrl: string;
  preview?: string;
  isLoading: boolean;
}

const CreateCollection: React.FC<FormikProps<ICreateCollection>> = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form-create-coll" className="form-create-coll" layout="vertical">
      <div className="form-create-coll__upload">
        <div className="form-create-coll__upload-img">
          <img src={values.preview} alt="" />
        </div>
        <div className="form-create-coll__upload-item">
          <Form.Item
            name="img"
            className="form-create__item input__field"
            validateStatus={validateField('img', touched, errors)}
            help={!touched.img ? false : errors.img}
          >
            <p className="text-gray text-bold">
              We recommend an image of at least 400x400. Gift work too.
            </p>
            <Uploader type="button" />
          </Form.Item>
        </div>
      </div>
      <Form.Item
        name="tokenName"
        className="form-create-coll__item form-create-coll__item-name input__field"
        validateStatus={validateField('tokenName', touched, errors)}
        help={!touched.tokenName ? 'Token name cannot be changed in future' : errors.tokenName}
        label={<span className="input__label text-bold">Display name</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="tokenName"
            className="form-create-coll__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="Collection Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="symbol"
        className="form-create-coll__item input__field"
        validateStatus={validateField('symbol', touched, errors)}
        help={!touched.symbol ? false : errors.symbol}
        label={<span className="input__label text-bold">Symbol</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="symbol"
            className="form-create-coll__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="AAR"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="descr"
        className="form-create-coll__item input__field"
        validateStatus={validateField('descr', touched, errors)}
        help={!touched.descr ? false : errors.descr}
        label={<span className="input__label text-bold">Description</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="descr"
            className="form-create-coll__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="Describe your collection"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="shortUrl"
        className="form-create-coll__item form-create-coll__item-short input__field"
        validateStatus={validateField('shortUrl', touched, errors)}
        help={!touched.shortUrl ? false : errors.shortUrl}
        label={<span className="input__label text-bold">Short url</span>}
      >
        <div className="input__field-create box-shadow">
          <Input
            id="shortUrl"
            className="form-create-coll__input input input__create text-bold text-smd"
            size="large"
            type="text"
            placeholder="nft.dds.store/your_url"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <p className="form-create-coll__description text-bold text text-gray-l">
          Will be used as public URL
        </p>
      </Form.Item>
      <Button
        className="form-create-coll__submit-btn"
        loading={values.isLoading}
        colorScheme="gradient"
        size="md"
        onClick={onSubmit}
      >
        Create collection
      </Button>
    </Form>
  );
};

export default CreateCollection;
