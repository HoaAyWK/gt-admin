import { STATUS } from '../constants/orderStatus';
import axiosClient from './axios';

class OrderApi {
  getOrders = (params) => {
    const { page, pageSize, order, orderBy, orderStatus } = params;
    let url = `/api/orders?page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`;

    if (orderStatus) {
      url += `&orderStatus=${orderStatus}`;
    }

    return axiosClient.get(url);
  };

  getOrder = (id) => {
    const url = `/api/orders/${id}`;

    return axiosClient.get(url);
  };

  confirmOrderPaymentInfo = (id) => {
    const url = `/api/orders/${id}/confirm-payment-info`;

    return axiosClient.put(url, {});
  };
}

export default new OrderApi();
