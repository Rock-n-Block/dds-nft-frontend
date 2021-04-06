import React from 'react';
import { Link } from 'react-router-dom';

import MultiImg from '../../assets/img/icons/create-multi.svg';
import SingleImg from '../../assets/img/icons/create-single.svg';

import './Create.scss';

const CreatePage: React.FC = () => {
  return (
    <div className="create">
      <div className="row">
        <div className="create__content">
          <h1 className="h1-xl create__title text-bold">Create collectible</h1>
          <div className="create__subtitle text-smd text-bold text-center">
            Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you
            want to sell one collectible multiple times
          </div>
          <div className="create__wrapper">
            <Link to="create/single" className="create__item box-shadow">
              <img src={SingleImg} alt="" className="create__item-img" />
              <div className="text-grad create__item-text text-lg text-bold">Single</div>
            </Link>
            <Link to="create/multi" className="create__item box-shadow">
              <img src={MultiImg} alt="" className="create__item-img" />
              <div className="text-grad create__item-text text-lg text-bold">Multiple</div>
            </Link>
          </div>
          <div className="create__text text-smd text-bold text-center text-gray">
            We do not own your private keys and cannot access your funds without your confirmation
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
