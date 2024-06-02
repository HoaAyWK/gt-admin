import axiosClient from './axios/axiosClient';

class ProductApi {
  searchProduct = ({ searchTerm, page, pageSize, order, orderBy }) => {
    const url = `/api/products?search=${searchTerm}&page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`;

    return axiosClient.get(url);
  };

  getAllProduct = () => {
    const url = `/api/products?page=1&pageSize=1000`;

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

  updateProductAttribute = (productId, attributeId, data) => {
    const url = `/api/products/${productId}/attributes/${attributeId}`;

    return axiosClient.put(url, data);
  };

  updateProductVariant = (productId, variantId, data) => {
    var url = `/api/products/${productId}/variants/${variantId}`;

    return axiosClient.put(url, data);
  };

  deleteAttributeValue = (productId, attributeId, attributeValueId) => {
    const url = `/api/products/${productId}/attributes/${attributeId}/values/${attributeValueId}`;

    return axiosClient.delete(url);
  };
}

export default new ProductApi();
