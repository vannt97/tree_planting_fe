import { Warranty } from "src/models";
import { api } from "src/utils/api/axios.configs";
import { ApiRouters } from "src/utils/api/apiRouters";

const warrantyApi = {
  registerWarranty(data: Warranty) {
    const url = ApiRouters.WARRANTY_REGISTER;
    return api.post(url, data);
  },
};

export default warrantyApi;
