import React from 'react';
import nextId from 'react-id-generator';
import classNames from 'classnames';
import { connect } from 'formik';
import { observer } from 'mobx-react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import PlusImg from '../../../assets/img/icons/plus.svg';
import ArrowImg from '../../../assets/img/icons/swiper-arrow.svg';
import { rootStore } from '../../../store/store';

import './ChooseCollection.scss';

SwiperCore.use([Navigation]);

// interface IChooseCollection {
//   items: [
//     {
//       avatar: string;
//       name: string;
//       id: string;
//     },
//   ];
//   isSingle?: boolean;
// }

@observer
class ChooseCollection extends React.Component<any, any, any> {
  private prevRef = React.createRef<HTMLDivElement>();

  private nextRef = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      activeCollection: '',
    };

    this.changeCollection = this.changeCollection.bind(this);
  }

  componentDidMount() {
    if (this.props.items.length) {
      this.changeCollection(this.props.items[0].id);
    }
  }

  static handleOpenModal() {
    rootStore.modals.createCollection.open();
  }

  changeCollection(id: string) {
    if (this.props.formik.values.collectionId !== id) {
      this.setState({
        activeCollection: +id,
      });

      this.props.formik.setFieldValue('collectionId', id);
    }
  }

  render() {
    return (
      <div className="ch-coll">
        <div className="ch-coll__title text-grad text-lg text-bold">
          <span>Choose collection</span>
          <div
            className={classNames('ch-coll__nav-prev', {
              hidden: !this.props.items?.length,
            })}
            ref={this.prevRef}
          >
            <img src={ArrowImg} alt="" />
          </div>
          <div
            className={classNames('ch-coll__nav-next', {
              hidden: !this.props.items?.length,
            })}
            ref={this.nextRef}
          >
            <img src={ArrowImg} alt="" />
          </div>
        </div>
        <div className="ch-coll__content">
          <Swiper
            className="ch-coll__slider"
            spaceBetween={20}
            slidesPerView={3}
            navigation={{
              prevEl: this.prevRef.current!, // Assert non-null
              nextEl: this.nextRef.current!, // Assert non-null
            }}
            onInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = this.prevRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = this.nextRef.current;
              swiper.navigation.update();
            }}
          >
            <SwiperSlide className="ch-coll__slide" key={nextId()}>
              <div
                className="ch-coll__item box-shadow"
                onClick={ChooseCollection.handleOpenModal}
                onKeyDown={ChooseCollection.handleOpenModal}
                role="button"
                tabIndex={0}
              >
                <div className="ch-coll__item-img">
                  <img src={PlusImg} alt="new" />
                </div>
                <div className="ch-coll__item-title text-md text-bold">Create</div>
                <div className="text-bold text-gray-l">
                  {this.props.isSingle ? 'ERC-721' : 'ERC-1185'}
                </div>
              </div>
            </SwiperSlide>
            {this.props.items &&
              this.props.items.map((item: any) => (
                <SwiperSlide className="ch-coll__slide" key={nextId()}>
                  <div
                    className={classNames('ch-coll__item box-shadow', {
                      active: this.state.activeCollection === item.id,
                    })}
                    onClick={() => this.changeCollection(item.id.toString())}
                    onKeyDown={() => this.changeCollection(item.id.toString())}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ch-coll__item-img">
                      <img src={`https://${item.avatar}`} alt="dds" />
                    </div>
                    <div className="ch-coll__item-title text-md text-bold">{item.name}</div>
                    <div className="text-bold text-gray-l">
                      {this.props.isSingle ? 'ERC-721' : 'ERC-1155'}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default connect(ChooseCollection);
