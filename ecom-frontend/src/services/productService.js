import API_ENDPOINTS from "../config/apiEndPoints";
import { deleteRequest, getRequest, postRequest, putRequest } from "./axiosServices";

export const createProduct = async (data) => {
  try {
    console.log(data);
    let form_data = new FormData();
    if (data.image) {
      data.image.map((item) => form_data.append("image", item, item.name));

      delete data.image;
    }

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await postRequest(API_ENDPOINTS.PRODUCT, form_data, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (data, id) => {
  try {
    let form_data = new FormData();
    if (data.image) {
      data.image.map((item) => {
        if (typeof item === "object") {
          form_data.append("image", item, item.name);
        }
      });

      delete data.image;
      delete data.images;
    }
    data.brands = data.brands.value;
    console.log(data);

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await putRequest(API_ENDPOINTS.PRODUCT + "/" + id, form_data, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (type) => {
  try {
    let result = await getRequest(API_ENDPOINTS.PRODUCT);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (id) => {
  try {
    let result = await deleteRequest(API_ENDPOINTS.PRODUCT + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    let result = await getRequest(API_ENDPOINTS.PRODUCT + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductByCategory = async (slug) => {
  try {
    let result = await getRequest(API_ENDPOINTS.PRODUCT + "/cat/" + slug, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    let result = await getRequest(API_ENDPOINTS.PRODUCT + "/byslug/" + slug, true);
    return result;
  } catch (error) {
    throw error;
  }
};
