import axiosClient from './axios';

class AccountApi {
  updateAccount = (data) => {
    const { id, ...rest } = data;

    const url = `/api/customers/${id}`;

    return axiosClient.put(url, rest);
  };

  changePassword = (data) => {
    const url = '/api/account/change-password';

    return axiosClient.put(url, data);
  };

}

export default new AccountApi();
