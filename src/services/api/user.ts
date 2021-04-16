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
  getSingleCollections: () => axios.get(`account/self/${localStorage.dds_token}/collections`),
  getMe: () => axios.get(`account/self/${localStorage.dds_token}/`),
  update: (data: any) => axios.patch(`account/self/${localStorage.dds_token}/`, data),
};
