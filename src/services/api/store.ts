import axios from '../../core/axios';

// interface ICreate {
//   name: string;
//   // standart: string;
//   totalSupply: number;
//   // available: number;
//   description?: string;
//   price: number;
//   creatorRoyalty: number;
//   details?: any;
// }

export default {
  createToken: (data: any) => axios.post('store/create_token/', data),
  createCollection: (data: any) => axios.post('store/create_collection/', data),
  saveToken: (data: any) => axios.post('store/save_token/', data),
  saveCollection: (data: any) => axios.post('store/save_collection/', data),
  getExplore: (page: number) => axios.get(`store/hot/${page}/`),
  getCollections: () => axios.get('store/hot_collections/'),
  // getLiked: (address) => axios.get('store/liked/'),
};
