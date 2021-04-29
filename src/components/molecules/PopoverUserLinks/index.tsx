import React from 'react';

import { ReactComponent as EmailFilled } from '../../../assets/img/icons/social/user/email-filled.svg';
import { ReactComponent as FacebookFilled } from '../../../assets/img/icons/social/user/facebook-filled.svg';
import { ReactComponent as TelegramFilled } from '../../../assets/img/icons/social/user/telegram-filled.svg';
import { ReactComponent as TwitterFilled } from '../../../assets/img/icons/social/user/twitter-filled.svg';

import './PopoverUserLinks.scss';

export interface PopoverUserLinksProps {
  name: string;
  text?: string;
}

const PopoverUserLinks: React.FC<PopoverUserLinksProps> = ({ name, text }) => {
  const link = window.location;
  return (
    <div className="popover">
      <h3 className="popover__title text-smd text-bold text-grad">Share {name}</h3>
      <div className="popover__social-links">
        <div className="popover__social-links__social">
          <a
            href={`https://twitter.com/intent/tweet?url=${link}&text=${text}`}
            target="_blank"
            rel="noreferrer"
            className="popover__social-links__social-link"
          >
            <TwitterFilled />
            <p className="popover__social-links__social-name text-bold text-sm text-gray">
              Twitter
            </p>
          </a>
        </div>
        <div className="popover__social-links__social">
          {/* TODO: fix this btn */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
            target="_blank"
            rel="noreferrer"
            className="popover__social-links__social-link"
          >
            <FacebookFilled />
            <p className="popover__social-links__social-name text-bold text-sm text-gray">
              Facebook
            </p>
          </a>
        </div>
        <div className="popover__social-links__social">
          <a
            href={`https://t.me/share/url?url=${link}&text=${text}`}
            target="_blank"
            rel="noreferrer"
            className="popover__social-links__social-link"
          >
            <TelegramFilled />
            <p className="popover__social-links__social-name text-bold text-sm text-gray">
              Telegram
            </p>
          </a>
        </div>
        <div className="popover__social-links__social">
          <a
            href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${text} ${link}%0A`}
            target="_blank"
            rel="noreferrer"
            className="popover__social-links__social-link"
          >
            <EmailFilled />
            <p className="popover__social-links__social-name text-bold text-sm text-gray">Email</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopoverUserLinks;
