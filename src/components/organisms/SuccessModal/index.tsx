import React from 'react';
import { observer } from 'mobx-react-lite';

import SuccessImg from '../../../assets/img/icons/success.svg';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Modal } from '../../molecules';

import './SuccessModal.scss';

const SuccessModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.success.setSuccessMsg('');
  };

  return (
    <Modal isVisible={!!modals.success.successMsg} handleCancel={handleClose} className="m-success">
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
        <img src={SuccessImg} alt="success" />
        <p className="text-xl text-grad text-bold">{modals.success.successMsg}</p>
        <Button colorScheme="gradient" size="md" onClick={handleClose}>
          Awesome
        </Button>
      </div>
    </Modal>
  );
});

export default SuccessModal;
