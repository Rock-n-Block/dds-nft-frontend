import React from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox } from 'antd';

import { Modal } from '../../molecules';
import { Button } from '../../atoms';
import { useMst } from '../../../store/store';

import './TermsModal.scss';

const TermsModal: React.FC = observer(() => {
  const { modals } = useMst();

  const onOk = (): void => {
    modals.terms.close();
  };

  const [oldCheck, setOldCheck] = React.useState<boolean>(false);
  const [termsCheck, setTermsCheck] = React.useState<boolean>(false);
  console.log(oldCheck, termsCheck);

  const handleOkTerms = (): void => {
    modals.terms.close();
    localStorage.ddsTerms = true;
  };

  return (
    <Modal
      isVisible={modals.terms.isOpen}
      handleOk={onOk}
      handleCancel={() => modals.terms.close()}
      className="m-terms"
    >
      <div className="m-terms__content">
        <div className="m-terms__title text-bold text-lg">DDS Terms of Service</div>
        <div className="m-terms__text text-md">
          Please take a few minutes to read and understand DDS Terms of Service. To continue, you’ll
          need to accept the{' '}
          <a href="/" target="_blank" className="text-purple text-bold">
            Terms of Service
          </a>{' '}
          by checking the box.
        </div>
        <Checkbox defaultChecked={oldCheck} onChange={(e) => setOldCheck(e.target.checked)}>
          <span className="text-smd">I am at least 13 years old</span>
        </Checkbox>
        <Checkbox defaultChecked={termsCheck} onChange={(e) => setTermsCheck(e.target.checked)}>
          <span className="text-smd">I accept the DDSble Terms of Service</span>
        </Checkbox>
        <Button
          colorScheme="purple"
          size="lg"
          onClick={handleOkTerms}
          className="m-terms__btn"
          disabled={!oldCheck || !termsCheck}
        >
          GO
        </Button>
      </div>
    </Modal>
  );
});

export default TermsModal;
