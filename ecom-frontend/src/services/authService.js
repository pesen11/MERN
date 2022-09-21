import API_ENDPOINTS from "../config/apiEndPoints";
import { postRequest, getRequest } from "./axiosServices";
import UserService from "./userService";
// const user_svc = new UserService();

export const login = async (data) => {
  try {
    let loginResponse = await postRequest(API_ENDPOINTS.LOGIN_URL, data);

    if (loginResponse.result.accessToken) {
      localStorage.setItem("auth_token", loginResponse.result.accessToken); //local storage maa token store garne
      let user_info = {
        name: loginResponse.result.user.name,
        email: loginResponse.result.user.email,
        _id: loginResponse.result.user._id,
        role: loginResponse.result.user.role,
      };

      // let user_info_data = await user_svc.getById(loginResponse.result.user._id);
      // console.log(user_info_data);

      localStorage.setItem("auth_user", JSON.stringify(user_info));
      return loginResponse;
    } else {
      return loginResponse;
    }
  } catch (error) {
    throw error.response.data.msg;
  }
};

export const getVerified = async () => {
  try {
    let response = await getRequest(API_ENDPOINTS.VERIFY_USER, true);

    return response;
  } catch (err) {
    //err handler
    throw err;
  }
};
