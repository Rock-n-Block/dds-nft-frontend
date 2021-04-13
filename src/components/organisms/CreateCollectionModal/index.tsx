import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal } from '../../molecules';
import { useMst } from '../../../store/store';
import { CreateCollectionForm } from '../../../forms';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';

import './CreateCollectionModal.scss';

interface ICreateCollectionModal {
  isSingle?: boolean;
}

const CreateCollectionModal: React.FC<ICreateCollectionModal> = observer(({ isSingle }) => {
  const walletConnector = useWalletConnectorContext();
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.createCollection.close();
  };

  return (
    <Modal
      isVisible={modals.createCollection.isOpen}
      className="m-create-coll"
      handleCancel={handleClose}
    >
      <div className="m-create-coll__content">
        <div
          className="m-create-coll__close"
          onClick={handleClose}
          onKeyDown={handleClose}
          role="button"
          tabIndex={0}
        >
          <img src={ClearImg} alt="close" />
        </div>
        <div className="m-create-coll__title text-xl text-grad text-bold">Collection</div>
        <CreateCollectionForm isSingle={isSingle} walletConnector={walletConnector} />
      </div>
    </Modal>
  );
});

export default CreateCollectionModal;
