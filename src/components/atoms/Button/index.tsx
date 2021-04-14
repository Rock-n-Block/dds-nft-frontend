import React from 'react';
import { Link } from 'react-router-dom';
import { Button as BtnAntd } from 'antd';
import classNames from 'classnames';

interface ButtonProps {
  size?: 'sm' | 'lg' | 'md' | 'smd';
  colorScheme?: 'purple' | 'outline' | 'white' | 'gradient' | 'clear';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  link?: string;
  linkClassName?: string;
  shadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = '',
  colorScheme = 'purple',
  onClick,
  disabled = false,
  loading = false,
  link,
  linkClassName,
  shadow,
}) => {
  const Btn = (
    <BtnAntd
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(className, 'text text-bold btn', `btn-${size}`, `btn-${colorScheme}`, {
        'box-shadow': shadow,
        'btn-loading': loading,
      })}
    >
      {loading ? 'In progress...' : children}
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
