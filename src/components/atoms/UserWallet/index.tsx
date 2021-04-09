import React from 'react';
import classNames from 'classnames';

import { ReactComponent as CopySvg } from '../../../assets/img/icons/copy.svg';
import Button from '../Button';

import './UserWallet.scss';

export interface UserWalletProps {
  address: string;
  className?: string;
}

const UserWallet: React.FC<UserWalletProps> = ({ address, className }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <Button
      colorScheme="clear"
      shadow={false}
      className={classNames(className, 'user-wallet')}
      onClick={() => copyToClipboard()}
    >
      <span className="user-wallet__address">{address}</span>
      <CopySvg />
    </Button>
  );
};
export default UserWallet;
