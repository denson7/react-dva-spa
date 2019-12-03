import { request } from '@utils/request';
import * as api from '@services/login';

export default {
  namespace: 'login',
  state: {
    loggedIn: false,
    message: '',
    test: '',
    user: {}
  },
  reducers: {
    change(state, {payload}) {
      return {...state, ...payload};
    },
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    }
  },
  effects: {
    // * fetch({payload}, {put}) {
    //   console.log(payload);
    //   yield put({
    //     type: 'change',
    //     payload: {
    //       test: 'xxx'
    //     }});
    // },
    //
    *login({ payload }, { call, put }) {
      try {
        const data = yield call(api.login, payload);
        console.log(data);
        if (data) {
          //
        } else {
          yield put({
            type: 'loginError',
            payload: { data }
          });
        }
      } catch (e) {
        yield put({
          type: 'loginError'
        });
      }
    },
    *logout(_, { put }) {}
  },
  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    //   return history.listen(({ pathname }) => {
    //     if (pathname.indexOf('/login') !== -1) {
    //       // this.props.history.push('/login');
    //     }
    //   });
    // }
  }
};
