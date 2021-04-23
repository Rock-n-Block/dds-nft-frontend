import React from 'react';
import { Modal as ModalAntd } from 'antd';
import classNames from 'classnames';

interface IModal {
  isVisible: boolean;
  handleCancel?: () => void;
  width?: number | string;
  className?: string;
}

const Modal: React.FC<IModal> = ({
  children,
  isVisible,
  handleCancel,
  width = 'fit-content',
  className,
}) => {
  return (
    <ModalAntd
      title={false}
      visible={isVisible}
      footer={false}
      closable={false}
      onCancel={handleCancel}
      centered
      width={width}
      className={classNames('modal', className)}
    >
      {children}
    </ModalAntd>
  );
};

export default Modal;
