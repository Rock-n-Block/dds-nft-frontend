import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';

import SwapImg from '../../../assets/img/icons/arrows-swap.svg';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Modal } from '../../molecules';

import './ConvertModal.scss';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import BigNumber from 'bignumber.js/bignumber';

const ConvertModal: React.FC = observer(() => {
  const { modals, user } = useMst();
  const walletConnector = useWalletConnectorContext();
  const [value, setValue] = useState<string>('0');
  const [swappingCurrency, setSwappingCurrency] = useState<Array<'ETH' | 'dETH'>>(['ETH', 'dETH']);

  const loseFocus = (e: any) => {
    // TODO: change any
    if (e.key === 'Enter') {
      (e.target as HTMLElement).blur();
    }
  };
  const handleClose = (): void => {
    modals.convert.close();
  };
  const checkValid = (checkedValue: string): boolean => {
    const val = new BigNumber(checkedValue);
    const maxVal = new BigNumber(
      swappingCurrency[0] === 'ETH' ? user.balance?.eth : user.balance?.weth,
    );
    return val.isLessThan(maxVal);
  };
  const handleConvert = (): void => {
    if (swappingCurrency[0] === 'ETH') {
      setSwappingCurrency(['dETH', 'ETH']);
    } else {
      setSwappingCurrency(['ETH', 'dETH']);
    }
    setValue('0');
  };
  const handleSubmitConvert = (): void => {
    if (swappingCurrency[0] === 'ETH') {
      walletConnector.metamaskService.createTransaction('deposit', [value], 'WETH').then(() => {
        console.log('user.balance.eth, value', user.balance.eth, value);
        user.setBalance(
          new BigNumber(user.balance.eth).minus(new BigNumber(value)).toString(10),
          'eth',
        );
        user.setBalance(
          new BigNumber(user.balance.weth).plus(new BigNumber(value)).toString(10),
          'weth',
        );
      });
    } else {
      walletConnector.metamaskService.createTransaction('withdraw', [value], 'WETH').then(() => {
        user.setBalance(
          new BigNumber(user.balance.eth).plus(new BigNumber(value)).toString(10),
          'eth',
        );
        user.setBalance(
          new BigNumber(user.balance.weth).minus(new BigNumber(value)).toString(10),
          'weth',
        );
      });
    }
    modals.convert.close();
  };
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
            className="form-convert__item input__field"
            name="payCurrency"
            label={
              <>
                <span className="input__label text text-bold">You pay</span>
                <span className="input__label text text-bold text-gray">
                  Max amount is{' '}
                  {swappingCurrency[0] === 'ETH' ? user.balance?.eth : user.balance?.weth}
                </span>
              </>
            }
          >
            <div className="input__field-create box-shadow box-white">
              <Input
                className="form-convert__input input input__create text-bold text-smd"
                placeholder="Enter an amount"
                value={value}
                suffix={swappingCurrency[0]}
                onBlur={(e) => setValue(e.target.value)}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => loseFocus(e)}
              />
              {!checkValid(value) && (
                <span className="form-convert__input-error text">
                  {value
                    ? `You don't have enough ${swappingCurrency[0]}`
                    : `Enter ${swappingCurrency[0]} amount to swap`}
                </span>
              )}
            </div>
          </Form.Item>
          <Button colorScheme="purple" className="m-convert__swap-img" onClick={handleConvert}>
            <img src={SwapImg} alt="swap" />
          </Button>
          <Form.Item
            className="form-convert__item input__field"
            name="payCurrency"
            label={<span className="input__label text text-bold">You receive</span>}
          >
            <div className="input__field-create box-shadow box-white">
              <Input
                className="form-convert__input input input__create text-bold text-smd"
                placeholder="Amount you will receive"
                value={value}
                suffix={swappingCurrency[1]}
                onBlur={(e) => setValue(e.target.value)}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => loseFocus(e)}
              />
            </div>
          </Form.Item>
          <Button
            onClick={handleSubmitConvert}
            size="md"
            colorScheme="gradient"
            className="m-convert__convert-btn"
            disabled={!checkValid(value)}
          >
            Convert
          </Button>
        </Form>
      </div>
    </Modal>
  );
});

export default ConvertModal;
