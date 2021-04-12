import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal } from '../../molecules';
import MetamaskImg from '../../../assets/img/icons/metamask.svg';
import { useMst } from '../../../store/store';

import './MetamaskErrModal.scss';

const MetamaskErrModal: React.FC = observer(() => {
  const { modals } = useMst();
  return (
    <Modal isVisible={!!modals.metamask.errMsg} className="m-metamask">
      <div className="m-metamask__content">
        <img src={MetamaskImg} alt="" className="m-metamask__img" />
        <p className="text-md">{modals.metamask.errMsg}</p>
      </div>
    </Modal>
  );
});

export default MetamaskErrModal;