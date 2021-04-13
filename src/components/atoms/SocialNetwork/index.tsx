import React from 'react';

// import { ReactComponent as Discord } from '../../../assets/img/icons/social/user/discord.svg';
// import { ReactComponent as DiscordFilled } from '../../../assets/img/icons/social/user/discrod-filled.svg';
import { ReactComponent as EmailFilled } from '../../../assets/img/icons/social/user/email-filled.svg';
// import { ReactComponent as Email } from '../../../assets/img/icons/social/user/email.svg';
import { ReactComponent as FacebookFilled } from '../../../assets/img/icons/social/user/facebook-filled.svg';
// import { ReactComponent as Facebook } from '../../../assets/img/icons/social/user/facebook.svg';
// import { ReactComponent as InstagramFilled } from '../../../assets/img/icons/social/user/instagram-filled.svg';
import { ReactComponent as Instagram } from '../../../assets/img/icons/social/user/instagram.svg';
import { ReactComponent as TelegramFilled } from '../../../assets/img/icons/social/user/telegram-filled.svg';
import { ReactComponent as TwitterFilled } from '../../../assets/img/icons/social/user/twitter-filled.svg';
// import { ReactComponent as Telegram } from '../../../assets/img/icons/social/user/telegram.svg';
import { ReactComponent as Twitter } from '../../../assets/img/icons/social/user/twitter.svg';
// import { ReactComponent as YoutubeFilled } from '../../../assets/img/icons/social/user/youtube-filled.svg';
// import { ReactComponent as Youtube } from '../../../assets/img/icons/social/user/youtube.svg';

export interface ISocialNetwork {
  networkType: 'Twitter' | 'Facebook' | 'Telegram' | 'Email' | 'Instagram' | 'Discord' | 'Youtube';
  name: string;
  link: string;
}

interface SocialNetworkProps {
  socialNetwork: ISocialNetwork;
  withTitle?: boolean;
  className: string;
}

const SocialNetwork: React.FC<SocialNetworkProps> = ({
  socialNetwork,
  withTitle = false,
  className,
}) => {
  // TODO: uncomment all when icons rdy
  switch (socialNetwork.networkType) {
    case 'Twitter':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              <Twitter />
              {socialNetwork.name}
            </>
          ) : (
            <>
              <TwitterFilled />
            </>
          )}
        </a>
      );
    case 'Facebook':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              {/* <Facebook /> */}
              {socialNetwork.name}
            </>
          ) : (
            <>
              <FacebookFilled />
            </>
          )}
        </a>
      );
    case 'Telegram':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              {/* <Telegram /> */}
              {socialNetwork.name}
            </>
          ) : (
            <>
              <TelegramFilled />
            </>
          )}
        </a>
      );
    case 'Email':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              {/* <Email /> */}
              {socialNetwork.name}
            </>
          ) : (
            <>
              <EmailFilled />
            </>
          )}
        </a>
      );
    case 'Instagram':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              <Instagram />
              {socialNetwork.name}
            </>
          ) : (
            <>{/* <InstagramFilled /> */}</>
          )}
        </a>
      );
    case 'Discord':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              {/* <Discord /> */}
              {socialNetwork.name}
            </>
          ) : (
            <>{/* <DiscordFilled /> */}</>
          )}
        </a>
      );
    case 'Youtube':
      return (
        <a href={socialNetwork.link} target="_blank" rel="noreferrer" className={className}>
          {withTitle ? (
            <>
              {/* <Youtube /> */}
              {socialNetwork.name}
            </>
          ) : (
            <>{/* <YoutubeFilled /> */}</>
          )}
        </a>
      );
    default:
      return <></>;
  }
};

export default SocialNetwork;
