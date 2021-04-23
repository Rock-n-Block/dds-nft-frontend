import React from 'react';
import { observer } from 'mobx-react-lite';

import { VerifyForm } from '../../../forms';
import { useMst } from '../../../store/store';
import { Modal } from '../../molecules';

import './VerifyModal.scss';

const VerifyModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.verify.close();
  };
  return (
    <Modal
      isVisible={modals.verify.isOpen}
      className="m-verify"
      handleCancel={handleClose}
      width={500}
    >
      <div className="m-verify__content">
        <div className="m-verify__slider">
          <VerifyForm />
        </div>
      </div>
    </Modal>
  );
});

export default VerifyModal;
