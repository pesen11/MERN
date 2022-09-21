import { getRequest } from "./axiosServices";

class BaseService {
  constructor(type) {
    this.svc = type;
  }
  getById = async (id) => {
    return getRequest("/" + this.svc + "/" + id);
  };
}

export default BaseService;
