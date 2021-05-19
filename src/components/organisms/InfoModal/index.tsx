import React from 'react';
import { observer } from 'mobx-react-lite';

import SuccessImg from '../../../assets/img/icons/success.svg';
import CancelImg from '../../../assets/img/icons/cancel.svg';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Modal } from '../../molecules';

import './InfoModal.scss';

const InfoModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.info.close();
  };

  return (
    <Modal isVisible={!!modals.info.msg} handleCancel={handleClose} className="m-success">
      <div className="m-success__content">
        <div
          className="m-success__close"
          onClick={handleClose}
          onKeyDown={handleClose}
          role="button"
          tabIndex={0}
        >
          <img src={ClearImg} alt="close" />
        </div>
        {modals.info.type === 'error' ? (
          <img src={CancelImg} alt="success" />
        ) : (
          <img src={SuccessImg} alt="success" />
        )}
        <p className="text-xl text-grad text-bold">{modals.info.msg}</p>
        <Button colorScheme="gradient" size="md" onClick={handleClose}>
          {modals.info.type === 'error' ? 'Ok' : 'Awesome'}
        </Button>
      </div>
    </Modal>
  );
});

export default InfoModal;
