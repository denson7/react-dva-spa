import { request } from '@utils/request';

export default {
  namespace: 'user',
  state: {
    // 是否显示对话框
    isShowDialog: false,
    // 用户列表
    users: [
      {
        id: 1,
        username: '张三',
        email: '123456@qq.com',
        phone: '13990123456',
        createTime: '2019-12-2 16:15:55',
        roleId: 1
      },
      {
        id: 2,
        username: '李四',
        email: '2342316@qq.com',
        phone: '13123112456',
        createTime: '2019-12-2 16:15:55',
        roleId: 2
      },
      {
        id: 3,
        username: '王五',
        email: '56442316@qq.com',
        phone: '17723113456',
        createTime: '2019-12-2 16:15:55',
        roleId: 2
      }
    ],
    // 当前记录
    curDetail: {},
    // 角色列表
    roles: [
      {
        id: 1,
        name: '超管',
        value: 1
      },
      {
        id: 2,
        name: '开发',
        value: 2
      },
      {
        id: 3,
        name: '运维',
        value: 3
      }
    ],
  },
  reducers: {
    change(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    * fetch({payload}, {put}) {
      yield put({
        type: 'change',
        payload: {
          test: 'xxx'
        }});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  }
};
