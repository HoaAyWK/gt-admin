import axiosClient from './axios';

class BrandApi {
  getAll = () => {
    const url = '/api/brands';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/api/brands';

    return axiosClient.post(url, data);
  };

  update = (id, data) => {
    const url = `/api/brands/${id}`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/api/brands/${id}`;

    return axiosClient.delete(url);
  };
};

export default new BrandApi();
