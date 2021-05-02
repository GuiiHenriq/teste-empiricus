import axios from "axios";

export const api = {
  get(endpoint) {
    return axios.get(endpoint);
  },
};
