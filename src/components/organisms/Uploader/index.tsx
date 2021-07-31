import React from 'react';
import { message, Upload } from 'antd';
import { useFormikContext } from 'formik';

import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { Button } from '../../atoms';
import { IColorScheme, ISize } from '../../atoms/Button';
import useAutoplay from '../../../services/hooks/useAutoplay';

const { Dragger } = Upload;

interface IUploader extends IColorScheme, ISize {
  type?: 'area' | 'button';
  handleUpload?: (file: any) => void;
  className?: string;
  isLoading?: boolean;
  isVideoAllowed?: boolean;
}

const Uploader: React.FC<IUploader> = ({
  type = 'area',
  colorScheme = 'outline',
  size = 'sm',
  isLoading = false,
  className,
  handleUpload,
  children,
  isVideoAllowed,
}) => {
  const { autoplay } = useAutoplay();
  const formik = useFormikContext();
  const [imageUrl, setImageUrl] = React.useState('');
  const [isVideo, setIsVideo] = React.useState(false);
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      formik.setFieldValue('preview', reader.result);
      callback(reader.result);
    });
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: any) => {
    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/gif' ||
      (isVideoAllowed && file.type === 'video/mp4');
    if (!isValidType) {
      message.error(`You can only upload JPG/PNG/WEBP/GIF${isVideoAllowed ? '/MP4' : ''} file!`);
    }
    if (file.type === 'video/mp4') {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
    const isLt2M = file.size / 1024 / 1024 <= 30;
    if (!isLt2M) {
      message.error('Image must be smaller than 30MB!');
    }
    return isValidType && isLt2M;
  };
  const handleChange = ({ file }: any) => {
    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/gif' ||
      (isVideoAllowed && file.type === 'video/mp4');
    if (!isValidType) {
      return;
    }
    if (file.type === 'video/mp4') {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
    const isLt2M = file.size / 1024 / 1024 < 30;
    if (!isLt2M) {
      return;
    }
    if (handleUpload) {
      handleUpload(file.originFileObj);
    } else {
      formik.setFieldValue('img', file.originFileObj);
      getBase64(file.originFileObj, (url: any) => setImageUrl(url));
    }
  };
  const handleClear = () => {
    setImageUrl('');
    formik.setFieldValue('img', '');
    formik.setFieldValue('preview', '');
  };
  return (
    <div className={`${className || ''} uploader`}>
      {type === 'area' ? (
        <>
          <Dragger
            beforeUpload={beforeUpload}
            onChange={handleChange}
            multiple={false}
            showUploadList={false}
          >
            {!isVideo &&
              (imageUrl ? <img src={imageUrl} alt="" className="uploader__img" /> : children)}
            {isVideo &&
              (imageUrl ? (
                <video className="uploader__img" controls autoPlay={autoplay === 'true'}>
                  <source src={imageUrl} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                  <track kind="captions" />
                </video>
              ) : (
                children
              ))}
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
        </>
      ) : (
        ''
      )}
      {type === 'button' ? (
        <Upload
          beforeUpload={beforeUpload}
          onChange={handleChange}
          multiple={false}
          showUploadList={false}
        >
          <Button colorScheme={colorScheme} size={size} loading={isLoading}>
            Choose file
          </Button>
        </Upload>
      ) : (
        ''
      )}
    </div>
  );
};

export default Uploader;
