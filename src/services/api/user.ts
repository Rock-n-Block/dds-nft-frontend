import axios from '../../core/axios';

interface ILogin {
  address: string;
  signedMsg: string;
  msg: string;
}

export default {
  login: (data: ILogin) =>
    axios.post('account/metamask_login/', {
      address: data.address,
      signed_msg: data.signedMsg,
      msg: data.msg,
    }),
  getMsg: () => axios.get('account/get_metamask_message/'),
  getSingleCollections: (address?: string) =>
    axios.get(`account/self/${address || localStorage.dds_token}/collections/`),
  getMe: () => axios.get(`account/self/${localStorage.dds_token}/`),
  update: (data: any) => axios.patch(`account/self/${localStorage.dds_token}/`, data),
  follow: (data: { id: number | undefined }) =>
    axios.post(`account/self/${localStorage.dds_token}/follow/`, data),
  like: (data: { id: number | undefined }) =>
    axios.post(`account/self/${localStorage.dds_token}/like/`, data),
  verifyMe: (data: any) => axios.post('/account/verification/', data),
  setUserCover: (file: any) => {
    const data = new FormData();
    data.append('auth_token', localStorage.dds_token);
    data.append('cover', file);
    return axios.post('/account/set_user_cover/', data);
  },
  getRandomCover: () => axios.get('/account/get_random_cover/'),
  unfollow: (
    data: { id: number | undefined }, // TODO: remove if follow and unfollow united
  ) => axios.post(`account/self/${localStorage.dds_token}/unfollow/`, data),
  getUser: (data: { id: string }) => axios.get(`account/${data.id}/`),
  getFollowing: (address: string, page: number) =>
    axios.get(`account/following/${address}/${page}/`),
  getFollowers: (address: string, page: number) =>
    axios.get(`account/followers/${address}/${page}/`),
};
