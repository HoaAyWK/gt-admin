import axiosClient from './axios';

class BannerApi {
  getBanners = (params) => {
    const { page, pageSize, order, orderBy } = params;
    const url = `/api/banners?page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`;

    return axiosClient.get(url);
  };

  addBanner = (data) => {
    const url = '/api/banners';

    return axiosClient.post(url, data);
  };

  updateBanner = (data) => {
    const { id, ...rest } = data;
    const url = `/api/banners/${id}`;

    return axiosClient.put(url, rest);
  };
}

export default new BannerApi();
