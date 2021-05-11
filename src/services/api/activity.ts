import axios from '../../core/axios';

export default {
  getActivity: (address: string, page: string | number) =>
    axios.post(`activity/${page}/`, { address }),
};
