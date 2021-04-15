import React from 'react';

import firstCard from '../../assets/img/mock/user-activity-card.png';
import userAvatar from '../../assets/img/mock/user-avatar.png';
import { UserActivity } from '../../components/organisms';
import { UserActivityProps } from '../../components/organisms/UserActivity';

const activity: UserActivityProps = {
  filters: ['Listing', 'Purchases', 'Sales', 'Transfers', 'Burns', 'Bids', 'Likes', 'Followings'],
  activityCards: [
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: 'Herold Art',
      },
      activityType: 'Listing',
      time: 9,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Purchases',
      time: 9,
      cost: 0.08,
    },
    {
      img: firstCard,
      title: 'The son of a LEGO(man)',
      firstUser: {
        img: userAvatar,
        name: '0x869ce...5422',
      },
      secondUser: {
        img: userAvatar,
        name: '0x73640...d624',
      },
      activityType: 'Sales',
      time: 9,
      cost: 0.08,
    },
  ],
};

const Activity: React.FC = () => {
  return (
    <UserActivity
      withSort
      isMultipleFilterValues
      showPickedSort
      isAllFilterItem
      filters={activity.filters}
      activityCards={activity.activityCards}
    />
  );
};

export default Activity;
