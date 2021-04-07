import React from 'react';
import { message, Upload } from 'antd';
import { useFormikContext } from 'formik';

import ClearImg from '../../../assets/img/icons/uploader-cross.svg';

const { Dragger } = Upload;

const Uploader: React.FC = () => {
  const formik = useFormikContext();
  const [imageUrl, setImageUrl] = React.useState('');
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      formik.setFieldValue('img', reader.result);
      callback(reader.result);
    });
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 30;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = ({ file }: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return;
    }
    getBase64(file.originFileObj, (url: any) => setImageUrl(url));
  };
  const handleClear = () => {
    setImageUrl('');
    formik.setFieldValue('img', '');
  };
  return (
    <div className="uploader">
      <Dragger
        beforeUpload={beforeUpload}
        onChange={handleChange}
        multiple={false}
        showUploadList={false}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="uploader__img" />
        ) : (
          <span className="text-gray-l text-smd text-bold">
            PNG, GIF, WEBP, MP4 or MP3. Max 30mb.
          </span>
        )}
      </Dragger>
      {imageUrl ? (
        <div
          className="uploader__clear"
          onClick={handleClear}
          onKeyDown={handleClear}
          role="button"
          tabIndex={0}
        >
          <img src={ClearImg} alt="" />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Uploader;
