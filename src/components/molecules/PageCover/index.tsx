import React from 'react';
import './PageCover.scss';
import ShadowImg from '../../../assets/img/shadow.png';
import { Button } from '../../atoms';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../store/store';
import UploadCoverModal from '../UploadCoverModal';

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
