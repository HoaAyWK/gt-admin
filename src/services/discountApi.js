import axiosClient from './axios';

class BrandApi {
  getAll = () => {
    const url = '/api/discounts';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/api/discounts';

    return axiosClient.post(url, data);
  };

  update = (id, data) => {
    const url = `/api/discounts/${id}`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/api/discounts/${id}`;

    return axiosClient.delete(url);
  };
};

export default new BrandApi();
