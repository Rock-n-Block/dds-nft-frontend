import React from 'react';
import { Link } from 'react-router-dom';

import MultiImg from '../../assets/img/icons/create-multi.svg';
import SingleImg from '../../assets/img/icons/create-single.svg';

import './CreateChoose.scss';

const CreateChoosePage: React.FC = () => {
  return (
    <div className="c-create">
      <div className="row">
        <div className="c-create__content">
          <h1 className="h1-xl c-create__title text-bold">Create collectible</h1>
          <div className="c-create__subtitle text-smd text-bold text-center">
            Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you
            want to sell one collectible multiple times
          </div>
          <div className="c-create__wrapper">
            <Link to="create/single" className="c-create__item box-shadow">
              <img src={SingleImg} alt="" className="c-create__item-img" />
              <div className="text-grad c-create__item-text text-lg text-bold">Single</div>
            </Link>
            <Link to="create/multi" className="c-create__item box-shadow">
              <img src={MultiImg} alt="" className="c-create__item-img" />
              <div className="text-grad c-create__item-text text-lg text-bold">Multiple</div>
            </Link>
          </div>
          <div className="c-create__text text-smd text-bold text-center text-gray">
            We do not own your private keys and cannot access your funds without your confirmation
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChoosePage;
