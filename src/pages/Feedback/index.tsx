import React from 'react';
import './Feedback.scss';
import { FeedBackForm } from '../../forms/index';

const Feedback: React.FC = () => {
  return (
    <main className="feedback">
      <h2 className="feedback__title h1-xl text-blue-grad ">Feedback</h2>
      <FeedBackForm />
    </main>
  );
};

export default Feedback;
