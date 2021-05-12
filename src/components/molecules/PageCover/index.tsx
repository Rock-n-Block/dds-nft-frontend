import React from 'react';
import { observer } from 'mobx-react-lite';

import ShadowImg from '../../../assets/img/shadow.png';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import UploadCoverModal from '../UploadCoverModal';

import './PageCover.scss';

interface PageCoverProps {
  img: string;
  self: boolean;
  handleUpload?: (file: any) => void;
}

const PageCover: React.FC<PageCoverProps> = observer(({ img, handleUpload, self = false }) => {
  const { modals } = useMst();
  const handleClick = () => {
    modals.uploadCover.open();
  };
  return (
    <div className="cover" style={{ backgroundImage: `url(${ShadowImg}), url(https://${img})` }}>
      {self && (
        <Button size="sm" colorScheme="white" className="cover__edit-btn" onClick={handleClick}>
          Edit cover
        </Button>
      )}
      <UploadCoverModal handleUpload={handleUpload} />
    </div>
  );
});

export default PageCover;
