// import request from '@utils/request';
import {get, post} from '@utils/send';
const proxy = '/api';

export const getList = (params) => {
  return {
    status: 200,
    message: 'xx',
    data: []
  };
};

export const login = (params) => {
  return post(proxy + '/api/v1/topics', params);
};


