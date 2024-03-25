import axiosClient from "./axios/axiosClient";

class ProductApi {
  searchProduct = ({ searchTerm, page, pageSize, order, orderBy }) => {
    const url = `/api/products?search=${searchTerm}&page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`;

    return axiosClient.get(url);
  };

  create = (product) => {
    const url = `/api/products`;

    return axiosClient.post(url, product);
  };

  getProduct = (id) => {
    const url = `/api/products/${id}`;

    return axiosClient.get(url);
  };

  updateProduct = (id, data) => {
    const url = `/api/products/${id}`;

    return axiosClient.put(url, data);
  };

  addAttribute = (productId, data) => {
    const url = `/api/products/${productId}/attributes`;

    return axiosClient.post(url, data);
  };

  addAttributeValue = (productId, attributeId, data) => {
    const url = `/api/products/${productId}/attributes/${attributeId}/values`;

    return axiosClient.post(url, data);
  };

  addVariant = (productId, data) => {
    const url = `/api/products/${productId}/variants`;

    return axiosClient.post(url, data);
  };

  addImage = (productId, data) => {
    const url = `/api/products/${productId}/images`;

    return axiosClient.post(url, data);
  };
}

export default new ProductApi();
