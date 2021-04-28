import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useMst } from '../../../store/store';
import { Modal } from '../../molecules';

import './AuctionModal.scss';
import { Button } from '../../atoms';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import PlaceBidForm from '../../../forms/PlaceBid/container';

interface AuctionModalProps {
  owner?: {
    name: string;
    id?: number | string;
  };
  artist?: {
    name: string;
    id?: number | string;
  };
}

const AuctionModal: React.FC<AuctionModalProps> = observer(({ owner, artist }) => {
  const { modals } = useMst();

  const handleClose = (): void => {
    modals.auction.close();
  };
  return (
    <Modal
      isVisible={modals.auction.isOpen}
      className="m-auction"
      handleCancel={handleClose}
      width={380}
    >
      <div className="m-auction__content">
        <Button className="m-auction__close-btn" colorScheme="clear" onClick={handleClose}>
          <img src={ClearImg} alt="close" />
        </Button>
        <h2 className="text-grad text-xl text-bold">Place a bid</h2>
        <p className="m-auction__description text-gray text-bold">
          You are about to place a bid for the&nbsp;
          <Link to={`/user/${owner?.id}`} className="text-purple">
            {owner?.name}
          </Link>
          &nbsp;by&nbsp;
          <Link to={`/user/${artist?.id}`} className="text-purple">
            {artist?.name}
          </Link>
        </p>
        <PlaceBidForm />
      </div>
    </Modal>
  );
});

export default AuctionModal;
