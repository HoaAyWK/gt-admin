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
    const { bannerId } = data;
    const url = `/api/banners/${bannerId}`;

    return axiosClient.put(url, data);
  };
}

export default new BannerApi();
