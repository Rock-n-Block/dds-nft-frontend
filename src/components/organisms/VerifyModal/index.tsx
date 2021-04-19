import React /* , { useState } */ from 'react';
// import { Form, Input, Radio } from 'antd';
import { observer } from 'mobx-react-lite';

import { VerifyForm } from '../../../forms';
// import SwiperCore, { Navigation } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { ReactComponent as MCheck } from '../../../assets/img/icons/m-check.svg';
// import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import { useMst } from '../../../store/store';
// import { Button } from '../../atoms';
import { Modal } from '../../molecules';

// import { Uploader } from '../index';
import './VerifyModal.scss';

const VerifyModal: React.FC = observer(() => {
  const { modals } = useMst();
  // const [youAre, setYouAre] = useState<'creator' | 'collector'>('creator');
  // const prevRef = React.useRef<HTMLDivElement>(null);
  // const nextRef = React.useRef<HTMLDivElement>(null);

  const handleClose = (): void => {
    modals.verify.close();
  };
  return (
    <Modal
      isVisible={modals.verify.isOpen}
      className="m-verify"
      handleCancel={handleClose}
      width={500}
    >
      <div className="m-verify__content">
        <div className="m-verify__slider">
          {/* <div ref={prevRef} className="swiper-navigation swiper-navigation-prev">
            <img src={ArrowImg} alt="arrow" />
          </div>
          <div ref={nextRef} className="swiper-navigation swiper-navigation-next">
            <img src={ArrowImg} alt="arrow" />
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            simulateTouch={false}
            navigation={{
              prevEl: prevRef.current!, // Assert non-null
              nextEl: nextRef.current!, // Assert non-null
            }}
            onInit={(swiper) => {
              swiper.params.simulateTouch = false;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.update();
            }}
          >
            <SwiperSlide className="m-verify__slide">
              <MCheck className="m-verify__check-img" />
              <h2 className="m-verify__header text-bold text-smd text-center">
                To keep DDS users safe, we welcome everyone to proceed with the adjusted
                verification process
              </h2>
              <p className="m-verify__description text-center">
                Please answer a few questions to apply for Verified Badge. Here are some tips on
                getting it right. NB: badges are granted in limited quantity at the team’s
                discretion.
                <br />
                <br />
                The verification process usually takes up to 2 weeks.
              </p>
              <p className="m-verify__description-secondary text-bold text-smd">Takes 7+ min</p>
              <Button colorScheme="gradient" size="md" className="m-verify__start-btn">
                Start
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">2</span>/9
              </p>
              <h2 className="m-verify__header text-bold text text-center">
                Your Ethereum wallet address (please don&apos;t add ENS wallet name)
              </h2>
              <Form.Item className="form-verify__input input__field">
                <div className="input__field-create box-white box-shadow">
                  <Input
                    id="verifyDisplayName"
                    size="large"
                    placeholder="Enter your display name"
                    className="input__create text-bold text-smd text-center"
                  />
                </div>
              </Form.Item>

              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">3</span>/9
              </p>
              <h2 className="m-verify__header text-bold text text-center">You are</h2>
              <Radio.Group
                onChange={(e) => setYouAre(e.target.value)}
                value={youAre}
                className="m-verify__radio"
              >
                <Radio value="creator" className="text-bold text-smd">
                  Creator
                </Radio>
                <Radio value="collector" className="text-bold text-smd">
                  Collector
                </Radio>
              </Radio.Group>
              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">4</span>/9
              </p>
              <h2 className="m-verify__header text-bold text text-center">
                Tell us about yourself. What is the concept behind items you are
                creating/collecting/selling? (±2 paragraphs, please be specific) This question is
                required.*
              </h2>
              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">5</span>/9
              </p>
              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">6</span>/9
              </p>
              <h2 className="m-verify__header text-bold text text-center">
                Attach a screenshot of your work in progress on one of your minted items in the
                editor of your choice (e.g. Photoshop, Illustrator, etc), or other backstage
                process. This question is required. *<br /> Choose file or drag here Size limit:
                10MB
              </h2>
              <Uploader className="m-verify__uploader">
                <>
                  <h4 className="text-black text-bold text-smd">
                    <span className="text-grad ">Choose file </span>or drag here
                  </h4>
                  <p className="uploader__size-limit text-sm">Size limit: 10 mb</p>
                </>
              </Uploader>
              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">7</span>/9
              </p>
              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">8</span>/9
              </p>
              <Button size="md" colorScheme="purple" className="m-verify__next-btn">
                Next
              </Button>
            </SwiperSlide>
            <SwiperSlide className="m-verify__slide">
              <p className="text-bold text-xl">
                <span className="text-grad">9</span>/9
              </p>
            </SwiperSlide>
          </Swiper> */}
          <VerifyForm />
        </div>
      </div>
    </Modal>
  );
});

export default VerifyModal;
