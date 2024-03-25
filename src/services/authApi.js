import axiosClient from './axios';

class AuthApi {
  login = (data) => {
    const url = '/api/Auth/login';
    return axiosClient.post(url, data);
  };

  getCurrentUserInfo = () => {
    const url = '/api/account/my-profile';
    return axiosClient.get(url);
  };
}

const authApi = new AuthApi();

export default authApi;
