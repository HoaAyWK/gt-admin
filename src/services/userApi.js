import axiosClient from './axios';

class UserApi {
  getAll = () => {
    const url = '/api/customers/all';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/user/api';

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = `/user/api`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/users/${id}`;

    return axiosClient.delete(url);
  };

  getStats = (fromDay) => {
    const url = `/api/customers/stats?fromDay=${fromDay}`;

    return axiosClient.get(url);
  };
};

export default new UserApi();
