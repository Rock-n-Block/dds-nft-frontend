import axios from '../../core/axios';

export default {
  createToken: (data: any) => axios.post('store/create_token/', data),
  createCollection: (data: any) => axios.post('store/create_collection/', data),
  saveToken: (data: any) => axios.post('store/save_token/', data),
  saveCollection: (data: any) => axios.post('store/save_collection/', data),
  getExplore: (page: number, filter: string, sort: string) =>
    axios.get(`store/hot/${page}/?sort=${sort}${filter !== 'all' ? `&tag=${filter}` : ''}`),
  getTags: () => axios.get(`store/tags/`),
  getCollections: () => axios.get('store/hot_collections/'),
  getCollectionById: (id: number | string, page: number) =>
    axios.get(`store/collection/${id}/${page}/`),
  getToken: (id: number | string) => axios.get(`store/${id}/`),
  buyToken: (id: number | string, amount: number) =>
    axios.post(`/store/buy/${localStorage.dds_token}/`, {
      id,
      erc20Address: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
      tokenAmount: amount,
    }),
  getLiked: (address: string, page: number) => axios.get(`store/liked/${address}/${page}/`),
  getCreated: (address: string, page: number) => axios.get(`store/created/${address}/${page}/`),
  getCollectibles: (address: string, page: number) => axios.get(`store/owned/${address}/${page}/`),
  getUserCollections: (address: string, page: number) =>
    axios.get(`store/collections/${address}/${page}/`),
  getSearchResults: (data: { text: string; page: number }, query: string) =>
    axios.post(
      `store/search/${query === 'items' ? '' : '?type='}${query === 'items' ? '' : query}`,
      {
        text: data.text,
        page: data.page,
      },
    ),
  setCollectionCover: (file: any, id: string) => {
    const data = new FormData();
    data.append('id', id);
    data.append('auth_token', localStorage.dds_token);
    data.append('cover', file);
    return axios.post('/store/set_cover/', data);
  },
};
