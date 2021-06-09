import React from 'react';
import { observer } from 'mobx-react-lite';

import { useMst } from '../../../store/store';
import { Uploader } from '../../organisms';
import { Modal } from '../index';

import './UploadCoverModal.scss';

interface UploadCoverModalProps {
  handleUpload?: (file: any) => void;
  isLoading: boolean;
}

const UploadCoverModal: React.FC<UploadCoverModalProps> = observer(
  ({ handleUpload, isLoading = false }) => {
    const { modals } = useMst();

    const handleClose = (): void => {
      modals.uploadCover.close();
    };

    return (
      <Modal
        isVisible={modals.uploadCover.isOpen}
        className="m-upload-cover"
        handleCancel={handleClose}
      >
        <div className="m-upload-cover__content">
          <h3 className="m-upload-cover__title text-xl text-grad text-bold">Update cover</h3>
          <p className="m-upload-cover__text text-gray text-md">
            Upload new cover for your profile page. We recommend to upload images in 1440x260
            resolution
          </p>
          <Uploader
            type="button"
            size="smd"
            handleUpload={handleUpload}
            className="m-upload-cover__upload-btn"
            isLoading={isLoading}
          />
        </div>
      </Modal>
    );
  },
);
export default UploadCoverModal;
