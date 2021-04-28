import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';

import SwapImg from '../../../assets/img/icons/arrows-swap.svg';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Modal } from '../../molecules';

import './ConvertModal.scss';

export interface ConvertModalProps {
  pay: ICurrency;
  receive: ICurrency;
}
interface ICurrency {
  value?: string;
  currency: string;
}

const ConvertModal: React.FC<ConvertModalProps> = observer(({ pay, receive }) => {
  const { modals } = useMst();
  const [payValue, setPayValue] = useState<ICurrency>({
    value: pay.value ?? '0',
    currency: pay.currency,
  });

  const [receiveValue, setReceiveValue] = useState<ICurrency>({
    value: receive.value ?? '0',
    currency: receive.currency,
  });

  const editValues = (e: any, prevValue: ICurrency, callBack: any): void => {
    callBack({ value: e.target.value, currency: prevValue.currency });
  };
  const loseFocus = (e: any) => {
    // TODO: change any
    if (e.key === 'Enter') {
      (e.target as HTMLElement).blur();
    }
  };
  const handleClose = (): void => {
    modals.convert.close();
  };
  const handleConvert = (): void => {
    const intermediateValue = payValue;
    setPayValue(receiveValue);
    setReceiveValue(intermediateValue);
    console.log(payValue, receiveValue);
  };
  /*
   */
  return (
    <Modal
      isVisible={modals.convert.isOpen}
      className="m-convert"
      handleCancel={handleClose}
      width={460}
    >
      <div className="m-convert__content">
        <Button className="m-convert__close-btn" colorScheme="clear" onClick={handleClose}>
          <img src={ClearImg} alt="close" />
        </Button>
        <h3 className="m-convert__title text-lg text-bold">Convert</h3>
        <Form name="form-convert" layout="vertical" className="m-convert__form form-convert">
          <Form.Item
            className="form-create-coll__item input__field"
            name="payCurrency"
            label={
              <>
                <span className="input__label text text-bold">You pay</span>
                <span className="input__label text text-bold text-gray">Max amount is 0</span>
              </>
            }
          >
            <div className="input__field-create box-shadow box-white">
              <Input
                className="form-create-coll__input input input__create text-bold text-smd"
                placeholder="Enter an amount"
                value={payValue.value}
                suffix={payValue.currency}
                onBlur={(e) => setPayValue({ value: e.target.value, currency: payValue.currency })}
                onChange={(e) => editValues(e, payValue, setPayValue)}
                onKeyDown={(e) => loseFocus(e)}
              />
            </div>
          </Form.Item>
          <Button colorScheme="purple" className="m-convert__swap-img" onClick={handleConvert}>
            <img src={SwapImg} alt="swap" />
          </Button>
          <Form.Item
            className="form-create-coll__item input__field"
            name="payCurrency"
            label={<span className="input__label text text-bold">You receive</span>}
          >
            <div className="input__field-create box-shadow box-white">
              <Input
                className="form-create-coll__input input input__create text-bold text-smd"
                placeholder="Amount you will receive"
                value={receiveValue.value}
                suffix={receiveValue.currency}
                onBlur={(e) =>
                  setReceiveValue({ value: e.target.value, currency: receiveValue.currency })
                }
                onChange={(e) => editValues(e, receiveValue, setReceiveValue)}
                onKeyDown={(e) => loseFocus(e)}
              />
            </div>
          </Form.Item>
          <Button
            onClick={handleConvert}
            size="md"
            colorScheme="gradient"
            className="m-convert__convert-btn"
          >
            Convert
          </Button>
        </Form>
      </div>
    </Modal>
  );
});

export default ConvertModal;
