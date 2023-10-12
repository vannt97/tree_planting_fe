import axios from 'axios';
import qs from 'qs';
import swal from 'sweetalert';
import { deleteToken } from '../helpers/localStorage';

const BASE_API_URL = process.env.NEXT_PUBLIC_DOMAIN_API || 'http://localhost:80';

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1800000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response } = error;
    if (response?.status === 401) {
      deleteToken();
      window.location.href = '/';
    }
    if (response?.status) {
      window.location.href = '/403';
    }
    if (response?.status) {
      swal({
        title: 'Thông báo',
        text: 'Có sự thay đổi về hệ thống, vui lòng đăng nhập lại.',
        icon: 'info',
        buttons: [false, 'Ok'],
      }).then((value) => {
        deleteToken();
        window.location.href = '/';
      });
    }
    return Promise.reject(error);
  }
);

if (typeof window !== 'undefined') {
  api.defaults.headers.common['Authorization'] = localStorage?.getItem('USER_TOKEN') === null ? null : `Bearer ${localStorage.getItem('USER_TOKEN')}`;
}

export function setAuthorization(token) {
  api.defaults.headers.common['Authorization'] = token === null ? token : `Bearer ${token}`;
}

export function removeAuthorization() {
  //For Logout
  setAuthorization(null);
}

export const exportAxios = (url, model) => {
  return {
    baseURL: `${BASE_API_URL}${url}`,
    timeout: 30000,
    responseType: 'blob',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('USER_TOKEN') === null ? null : `Bearer ${localStorage.getItem('USER_TOKEN')}`,
    },
    params: model,
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  };
};
