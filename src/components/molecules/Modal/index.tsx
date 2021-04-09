import React from 'react';
import { Modal as ModalAntd } from 'antd';
import classNames from 'classnames';

interface IModal {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel?: () => void;
  className: string;
}

const Modal: React.FC<IModal> = ({ children, isVisible, handleOk, handleCancel, className }) => {
  return (
    <ModalAntd
      title={false}
      visible={isVisible}
      footer={false}
      closable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      className={classNames('modal', className)}
    >
      {children}
    </ModalAntd>
  );
};

export default Modal;
