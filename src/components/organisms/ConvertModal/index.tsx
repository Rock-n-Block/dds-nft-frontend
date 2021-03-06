import React, { useState } from 'react';
import { Form, Input } from 'antd';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';

import SwapImg from '../../../assets/img/icons/arrows-swap.svg';
import ClearImg from '../../../assets/img/icons/uploader-cross.svg';
import { useWalletConnectorContext } from '../../../services/walletConnect';
import MetamaskService from '../../../services/web3';
import { useMst } from '../../../store/store';
import { Button } from '../../atoms';
import { Modal } from '../../molecules';

import './ConvertModal.scss';

const ConvertModal: React.FC = observer(() => {
  const { modals, user } = useMst();
  const walletConnector = useWalletConnectorContext();
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [swappingCurrency, setSwappingCurrency] = useState<Array<'ETH' | 'WETH'>>(['ETH', 'WETH']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (!+checkedValue || +checkedValue <= 0) {
      return false;
    }
    const val = new BigNumber(checkedValue);
    const maxVal = new BigNumber(
      swappingCurrency[0] === 'ETH' ? user.balance?.eth : user.balance?.weth,
    );
    return val.isLessThan(maxVal);
  };
  const handleConvert = (): void => {
    if (swappingCurrency[0] === 'ETH') {
      setSwappingCurrency(['WETH', 'ETH']);
    } else {
      setSwappingCurrency(['ETH', 'WETH']);
    }
    setValue('');
  };
  const handleSubmitConvert = (): void => {
    const weiValue = MetamaskService.calcTransactionAmount(value, 18);
    setIsLoading(true);
    if (swappingCurrency[0] === 'ETH') {
      walletConnector.metamaskService
        .createTransaction('deposit', [], 'WETH', '', '', '', weiValue)
        .then(() => {
          setIsLoading(false);

          user.setBalance(
            new BigNumber(user.balance.eth).minus(new BigNumber(value)).toString(10),
            'eth',
          );
          user.setBalance(
            new BigNumber(user.balance.weth).plus(new BigNumber(value)).toString(10),
            'weth',
          );
          modals.info.setMsg('Congrats you successfully swapped your eth to weth', 'success');
          modals.convert.close();
        })
        .catch((err: any) => {
          setIsLoading(false);
          console.log('error', err);
        });
    } else {
      walletConnector.metamaskService
        .createTransaction('withdraw', [weiValue], 'WETH')
        .then(() => {
          setIsLoading(false);

          user.setBalance(
            new BigNumber(user.balance.eth).plus(new BigNumber(value)).toString(10),
            'eth',
          );
          user.setBalance(
            new BigNumber(user.balance.weth).minus(new BigNumber(value)).toString(10),
            'weth',
          );
          modals.info.setMsg('Congrats you successfully swapped your eth to weth', 'success');
          modals.convert.close();
        })
        .catch((err: any) => {
          setIsLoading(false);
          console.log('error', err);
        });
    }
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
                onBlur={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
                onChange={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
                onKeyDown={(e) => loseFocus(e)}
              />
              {touched && !checkValid(value) && (
                <span className="form-convert__input-error text">
                  {+value !== 0 && +value
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
                onBlur={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
                onChange={(e) => {
                  setValue(e.target.value);
                  setTouched(true);
                }}
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
            loading={isLoading}
          >
            Convert
          </Button>
        </Form>
      </div>
    </Modal>
  );
});

export default ConvertModal;
