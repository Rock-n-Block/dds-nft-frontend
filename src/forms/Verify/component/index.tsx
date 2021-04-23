import React from 'react';
import { Form, Input, Radio } from 'antd';
import { FormikProps } from 'formik';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as MCheck } from '../../../assets/img/icons/m-check.svg';
import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import { Button } from '../../../components/atoms';
import { Uploader } from '../../../components/organisms';
import { validateField } from '../../../utils/validate';

export interface IVerifyForm {
  displayName: string;
  userType: 'creator' | 'collector';
  about: string;
  img: any;
  twitter: string;
  instagram: string;
  website: string;
  email: string;
  isLoading: boolean;
}

SwiperCore.use([Navigation]);
const VerifyForm: React.FC<FormikProps<IVerifyForm> & IVerifyForm> = ({
  setFieldValue,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
}) => {
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form className="form-verify">
      <div ref={prevRef} className="swiper-navigation swiper-navigation-prev">
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
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text-smd text-center">
              To keep DDS users safe, we welcome everyone to proceed with the adjusted verification
              process
            </h2>
            <p className="m-verify__description text-center">
              Please answer a few questions to apply for Verified Badge. Here are some tips on
              getting it right. NB: badges are granted in limited quantity at the team’s discretion.
              <br />
              <br />
              The verification process usually takes up to 2 weeks.
            </p>
            <p className="m-verify__description-secondary text-bold text-smd text-center">
              Takes 7+ min
            </p>
            <Button
              colorScheme="gradient"
              size="md"
              className="m-verify__start-btn"
              onClick={() => nextRef.current?.click()}
            >
              Start
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">2</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">
              Your Ethereum wallet address (please don&apos;t add ENS wallet name)
            </h2>
            <Form.Item
              className="form-verify__input input__field"
              validateStatus={validateField('displayName', touched, errors)}
              help={!touched.displayName ? false : errors.displayName}
            >
              <div className="input__field-create box-white box-shadow">
                <Input
                  id="displayName"
                  size="large"
                  placeholder="Enter your display name"
                  className="input__create text-bold text-smd text-center"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </Form.Item>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">3</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">You are</h2>
            <Form.Item>
              <Radio.Group
                onChange={(value) => setFieldValue('userType', value.target.value)}
                value={values.userType}
                className="m-verify__radio"
              >
                <Radio value="creator" className="text-bold text-smd">
                  Creator
                </Radio>
                <Radio value="collector" className="text-bold text-smd">
                  Collector
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">4</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">
              Tell us about yourself. What is the concept behind items you are
              creating/collecting/selling? (±2 paragraphs, please be specific)*
            </h2>

            <Form.Item
              className="form-verify__input input__field"
              validateStatus={validateField('about', touched, errors)}
              help={!touched.about ? false : errors.about}
            >
              <div className="input__field-create box-white box-shadow">
                <Input
                  id="about"
                  size="large"
                  placeholder="Tell us about yourself"
                  className=" input__create text-bold text-smd text-center"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </Form.Item>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">5</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">
              Attach a screenshot of your work in progress on one of your minted items in the editor
              of your choice (e.g. Photoshop, Illustrator, etc), or other backstage process. This
              question is required. *<br /> Choose file or drag here Size limit: 10MB
            </h2>
            <Uploader className="m-verify__uploader">
              <>
                <h4 className="text-black text-bold text-smd">
                  <span className="text-grad ">Choose file </span>or drag here
                </h4>
                <p className="uploader__size-limit text-sm">Size limit: 10 mb</p>
              </>
            </Uploader>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">6</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">Your Twitter account</h2>
            <h3 className="m-verify__header text-sm text-gray text-center">
              we highly recommend filling out this field, it increases your chances of passing the
              verification
            </h3>
            <Form.Item
              className="form-verify__input input__field"
              validateStatus={validateField('twitter', touched, errors)}
              help={!touched.twitter ? false : errors.twitter}
            >
              <div className="input__field-create box-white box-shadow">
                <Input
                  id="twitter"
                  size="large"
                  placeholder="https://"
                  className=" input__create text-bold text-smd text-center"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </Form.Item>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">7</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">Your Instagram account</h2>
            <h3 className="m-verify__header text-sm text-gray text-center">
              we highly recommend filling out this field, it increases your chances of passing the
              verification
            </h3>

            <Form.Item
              className="form-verify__input input__field"
              validateStatus={validateField('instagram', touched, errors)}
              help={!touched.instagram ? false : errors.instagram}
            >
              <div className="input__field-create box-white box-shadow">
                <Input
                  id="instagram"
                  size="large"
                  placeholder="https://"
                  className=" input__create text-bold text-smd text-center"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </Form.Item>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">8</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">
              Personal or project website
            </h2>
            <h3 className="m-verify__header text-sm text-gray text-center">
              we highly recommend filling out this field, it increases your chances of passing the
              verification
            </h3>

            <Form.Item
              className="form-verify__input input__field"
              validateStatus={validateField('website', touched, errors)}
              help={!touched.website ? false : errors.website}
            >
              <div className="input__field-create box-white box-shadow">
                <Input
                  id="website"
                  size="large"
                  placeholder="https://"
                  className=" input__create text-bold text-smd text-center"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </Form.Item>
            <Button
              size="md"
              colorScheme="purple"
              className="m-verify__next-btn"
              onClick={() => nextRef.current?.click()}
            >
              Next
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-verify__slide">
          <p className="text-bold text-xl">
            <span className="text-grad">9</span>/9
          </p>
          <div className="m-verify__container">
            <h2 className="m-verify__header text-bold text text-center">Your e-mail*</h2>

            <Form.Item
              className="form-verify__input input__field"
              validateStatus={validateField('email', touched, errors)}
              help={!touched.email ? false : errors.email}
            >
              <div className="input__field-create box-white box-shadow">
                <Input
                  id="email"
                  size="large"
                  placeholder="name@example.com"
                  className=" input__create text-bold text-smd text-center"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </Form.Item>
            <Button
              colorScheme="gradient"
              size="md"
              className="m-verify__start-btn"
              onClick={onSubmit}
            >
              Finish
            </Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </Form>
  );
};
export default VerifyForm;
