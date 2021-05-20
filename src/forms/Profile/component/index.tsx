import React from 'react';
import { Form, Input } from 'antd';
import { FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';

import { Button } from '../../../components/atoms';
import { Uploader } from '../../../components/organisms';
import VerifyModal from '../../../components/organisms/VerifyModal';
import { useMst } from '../../../store/store';
// import { validateField } from '../../../utils/validate';

export interface IProfile {
  displayName?: string;
  customUrl?: string;
  bio?: string;
  twitter?: string;
  instagram?: string;
  img?: any;
  preview?: string;
  isLoading: boolean;
}

// const { TextArea } = Input;

const Profile: React.FC<FormikProps<IProfile>> = observer(
  ({
    // touched,
    // errors,
    handleChange,
    handleBlur,
    values,
    handleSubmit,
  }) => {
    const { modals } = useMst();

    const handleOpenModal = (): void => {
      modals.verify.open();
    };

    const onSubmit = () => {
      handleSubmit();
    };
    return (
      <Form name="form-profile" className="form-profile" layout="vertical">
        <div className="form-profile__content">
          <Form.Item
            name="displayName"
            className="form-profile__item input__field"
            initialValue={values.displayName}
            label={<span className="input__label text-bold">Display name</span>}
          >
            <div className="input__field-create box-shadow">
              <Input
                id="displayName"
                value={values.displayName}
                className="form-profile__input input input__create text-bold text-smd"
                size="large"
                type="text"
                placeholder="Enter your display name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="customUrl"
            className="form-profile__item input__field"
            initialValue={values.customUrl}
            label={<span className="input__label text-bold">Custom URL</span>}
          >
            <div className="input__field-create box-shadow">
              <Input
                id="customUrl"
                value={values.customUrl}
                className="form-profile__input input input__create text-bold text-smd"
                size="large"
                type="text"
                placeholder="Dds.store/ Enter your custom URL"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="bio"
            className="form-profile__item input__field"
            initialValue={values.bio}
            label={<span className="input__label text-bold">Bio</span>}
          >
            <div className="input__field-create box-shadow">
              <Input
                id="bio"
                value={values.bio}
                className="form-profile__input input__create text-bold text-smd"
                size="large"
                placeholder="Tell about yourself in a few words"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="twitter"
            className="form-profile__item input__field"
            initialValue={values.twitter}
            label={
              <>
                <div className="input__label text-bold">Twitter Username</div>
                <div className="text-bold text-gray-l">
                  Link your Twitter account in order to get the verification badge
                </div>
              </>
            }
          >
            <div className="input__field-create box-shadow">
              <Input
                id="twitter"
                className="form-profile__input input input__create text-bold text-smd"
                size="large"
                type="text"
                value={values.twitter}
                placeholder="@"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-purple-l text-bold text-md">Link</div>
            </div>
          </Form.Item>
          <Form.Item
            name="instagram"
            className="form-profile__item input__field"
            initialValue={values.instagram}
            label={
              <>
                <div className="input__label text-bold">Instagram Username</div>
                <div className="text-bold text-gray-l">
                  Link your Instagram account in order to get the verification badge
                </div>
              </>
            }
          >
            <div className="input__field-create box-shadow">
              <Input
                id="instagram"
                className="form-profile__input input input__create text-bold text-smd"
                size="large"
                type="text"
                value={values.instagram}
                placeholder="@"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-purple-l text-bold text-md">Link</div>
            </div>
          </Form.Item>
          <div className="form-profile__verify">
            <div className="form-profile__verify-box">
              <div className="form-profile__verify-title text-bold">Verification</div>
              <div className="form-profile__verify-subtitle text-gray-l text-bold">
                Procceed with verification proccess to get more visibility and gain trust on DDSble
                Marketplace. Please allow up to several weeks for the process.
              </div>
            </div>
            <Button colorScheme="purple" size="smd" onClick={handleOpenModal}>
              Get verified
            </Button>
            <VerifyModal />
          </div>
          <Button colorScheme="gradient" size="md" onClick={onSubmit} loading={values.isLoading}>
            Update profile
          </Button>
        </div>
        <div className="form-profile__upload">
          <div className="form-profile__upload-img">
            <img src={values.preview} alt={values.displayName} />
          </div>
          <div className="form-profile__upload-text text-bold">
            We recommend an image of at least 400x400. Gifs work too.
          </div>
          <Uploader type="button" colorScheme="white" size="smd" />
        </div>
      </Form>
    );
  },
);

export default Profile;
