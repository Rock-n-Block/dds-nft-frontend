import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as CopySvg } from '../../../assets/img/icons/copy.svg';
import Button from '../Button';

import './UserWallet.scss';

export interface UserWalletProps {
  address: string;
  className?: string;
}

const UserWallet: React.FC<UserWalletProps> = ({ address, className }) => {
  const [displayAddress, setDisplayAddress] = useState(address);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };
  const sliceString = (text: string) => {
    return text.slice(0, 19).concat('...');
  };

  useEffect(() => {
    setDisplayAddress(sliceString(address));
  }, [address]);

  return (
    <Button
      colorScheme="clear"
      shadow={false}
      className={classNames(className, 'user-wallet')}
      onClick={() => copyToClipboard()}
    >
      <span className="user-wallet__address">{displayAddress}</span>
      <CopySvg />
    </Button>
  );
};
export default UserWallet;
