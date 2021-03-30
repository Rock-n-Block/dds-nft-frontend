import React from 'react';
import { Link } from 'react-router-dom';
import { Button as BtnAntd } from 'antd';
import classNames from 'classnames';

interface ButtonProps {
  size?: 'sm' | 'lg';
  colorScheme?: 'purple' | 'outline' | 'white';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  link?: string;
  linkClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = 'sm',
  colorScheme = 'purple',
  onClick,
  disabled = false,
  loading = false,
  link,
  linkClassName,
}) => {
  const Btn = (
    <BtnAntd
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(className, 'text text-bold btn', `btn-${size}`, `btn-${colorScheme}`)}
    >
      {/* {loading ? <img className="btn__spinner" src={SpinnerImg} /> : ''} */}
      {children}
    </BtnAntd>
  );
  if (link) {
    return (
      <Link className={classNames('btn-link', linkClassName)} to={link}>
        {Btn}
      </Link>
    );
  }
  return Btn;
};

export default Button;
