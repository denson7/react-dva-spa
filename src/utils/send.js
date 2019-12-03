import axios from 'axios';
import Qs from 'qs';

const API_SERVER = 'http://localhost:5000';

export const post = (url, param, baseServer = API_SERVER) => {
  const data = param;
  // data.token = 'xxx';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  const config = {
    url,
    withCredentials: true,
    method: 'post',
    baseURL: baseServer,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
    transformResponse: [function (data) {
      return data;
    }],
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    params: {
      timestamp: Date.parse(new Date()) / 1000
    },
    data,
    timeout: 60000,
    responseType: 'json'
  };
  return axios.post(url, data, config).then((resp) => {
    // do something
    return {
      data: resp.data
    };
  });
};

export const get = (url, params, baseServer = API_SERVER) => {
  const targetUrl = baseServer + url;
  return axios.get(targetUrl, {params}).then((resp) => {
    return {
      data: resp.data
    };
  });
};

