import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ArrowImg from '../../assets/img/icons/arrow-full.svg';
import { CreateForm } from '../../forms';
import { CreateCollectionModal } from '../../components/organisms';
import { useWalletConnectorContext } from '../../services/walletConnect';

import './Create.scss';

interface ICreate {
  isSingle?: boolean;
}

const Create: React.FC<RouteComponentProps & ICreate> = ({ isSingle, history }) => {
  const walletConnector = useWalletConnectorContext();
  return (
    <div className="create">
      <div className="row">
        <div className="create__content">
          <div
            className="create__back"
            onClick={history.goBack}
            role="button"
            tabIndex={0}
            onKeyDown={history.goBack}
          >
            <img src={ArrowImg} alt="" />
            <span className="text-gray-l text-smd text-bold">Go back</span>
          </div>
          <h1 className="create__title text-xl text-bold">
            <span>Create </span>
            <span className="text-grad">{isSingle ? 'single' : 'multiple'}</span>
            <span> collectible</span>
          </h1>
          <CreateForm isSingle={isSingle} walletConnector={walletConnector} />
        </div>
      </div>
      <CreateCollectionModal isSingle={isSingle} />
    </div>
  );
};

export default withRouter(Create);
