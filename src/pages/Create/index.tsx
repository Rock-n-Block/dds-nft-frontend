import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ArrowImg from '../../assets/img/icons/arrow-full.svg';
import { CreateCollectionModal } from '../../components/organisms';
import { CreateForm } from '../../forms';
import { userApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';

import './Create.scss';

interface ICreate {
  isSingle?: boolean;
}

const Create: React.FC<RouteComponentProps & ICreate> = ({ isSingle, history }) => {
  const walletConnector = useWalletConnectorContext();
  const [collections, setCollections] = React.useState([]);

  const getCollections = React.useCallback((): void => {
    userApi
      .getSingleCollections()
      .then(({ data }) => {
        console.log(data, 'single coll');
        setCollections(
          data.collections.filter((coll: any) => {
            if (isSingle) {
              return coll.standart === 'ERC721';
            }
            return coll.standart === 'ERC1185';
          }),
        );
      })
      .catch((err) => console.log(err, 'get single'));
  }, [isSingle]);

  React.useEffect(() => {
    getCollections();
  }, [isSingle, getCollections]);
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
          <CreateForm
            isSingle={isSingle}
            collections={collections}
            walletConnector={walletConnector}
          />
        </div>
      </div>
      <CreateCollectionModal isSingle={isSingle} getCollections={getCollections} />
    </div>
  );
};

export default withRouter(Create);
