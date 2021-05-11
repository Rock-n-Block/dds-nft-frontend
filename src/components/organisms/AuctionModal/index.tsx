import React from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import PlaceBidForm from '../../../forms/PlaceBid/container';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Modal } from '../../molecules';

import './AuctionModal.scss';

interface AuctionModalProps {
  token?: {
    name: string;
    id?: number | string;
  };
  artist?: {
    name: string;
    id?: number | string;
  };
}

const AuctionModal: React.FC<AuctionModalProps> = observer(({ token, artist }) => {
  const walletConnector = useWalletConnectorContext();
  const { modals, user } = useMst();

  const handleClose = (): void => {
    modals.auction.close();
  };

  React.useEffect(() => {
    if (user.address) {
      walletConnector.metamaskService.getWethBalance().then((data: any) => {
        user.setBalance(
          new BigNumber(data).dividedBy(new BigNumber(10).pow(18)).toString(10),
          'weth',
        );
        console.log(user);
      });
    }
  }, [user, user.address, walletConnector.metamaskService]);

  return (
    <Modal
      isVisible={modals.auction.isOpen}
      className="m-auction"
      handleCancel={handleClose}
      width={380}
      destroyOnClose
    >
      <div className="m-auction__content">
        <Button className="m-auction__close-btn" colorScheme="clear" onClick={handleClose}>
          <img src={ClearImg} alt="close" />
        </Button>
        <h2 className="text-grad text-xl text-bold">Place a bid</h2>
        <p className="m-auction__description text-gray text-bold">
          You are about to place a bid for the&nbsp;
          <Link to={`/token/${token?.id}`} className="text-purple">
            {token?.name}
          </Link>
          &nbsp;by&nbsp;
          <Link to={`/user/${artist?.id}`} className="text-purple">
            {artist?.name}
          </Link>
        </p>
        <PlaceBidForm
          balance={{
            value: user.balance?.weth ?? 0,
            currency: 'WETH',
          }}
        />
      </div>
    </Modal>
  );
});

export default AuctionModal;
