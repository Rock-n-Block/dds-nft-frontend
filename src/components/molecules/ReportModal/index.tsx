import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useMst } from '../../../store/store';
import { Modal } from '../index';
import { Input } from 'antd';

import './ReportModal.scss';
import { Button } from '../../atoms';
import { storeApi } from '../../../services/api';

const { TextArea } = Input;

const ReportModal: React.FC = observer(() => {
  const { modals } = useMst();
  const link = window.location;

  const [reportMessage, setReportMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = (): void => {
    modals.report.close();
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setReportMessage(value);
  };
  const submitReport = () => {
    console.log(reportMessage);
    setIsLoading(true);
    storeApi
      .reportPage(link.toString(), reportMessage)
      .then(() => {
        setIsLoading(false);
        modals.info.setMsg('Report submitted', 'success');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, 'report not submitted');
      });
  };
  return (
    <Modal
      isVisible={!!modals.report.isOpen}
      handleCancel={handleClose}
      className="m-report"
      closeIcon
      width={380}
    >
      <div className="m-report__content">
        <div className="m-report__title text-xl text-grad text-bold">Report</div>
        <div className="m-report__message-input input__field-create box-shadow">
          <TextArea
            className="input input__create text-bold text-smd"
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder="Enter report message"
            onChange={onChange}
          />
        </div>
        <Button
          onClick={submitReport}
          size="md"
          colorScheme="gradient"
          className="m-report__submit-btn"
          loading={isLoading}
        >
          Report
        </Button>
      </div>
    </Modal>
  );
});
export default ReportModal;
