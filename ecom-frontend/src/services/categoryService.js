import API_ENDPOINTS from "../config/apiEndPoints";
import { deleteRequest, getRequest, postRequest, putRequest } from "./axiosServices";

export const createCategory = async (data) => {
  try {
    let form_data = new FormData();
    if (data.image) {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    }

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await postRequest(API_ENDPOINTS.CATEGORY, form_data, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (data, id) => {
  try {
    let form_data = new FormData();
    if (data.image && typeof data.image === "object") {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    } else {
      delete data.image;
    }

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await putRequest(API_ENDPOINTS.CATEGORY + "/" + id, form_data, true, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (type) => {
  try {
    let result = await getRequest(API_ENDPOINTS.CATEGORY);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    let result = await deleteRequest(API_ENDPOINTS.CATEGORY + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    let result = await getRequest(API_ENDPOINTS.CATEGORY + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};
