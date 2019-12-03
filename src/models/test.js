import request from '@utils/request';
import * as api from '@services/home';

export default {
  namespace: 'test',
  state: {
    data: [],
    list: [
      {id: 1, title: '111'},
      {id: 2, title: '222'},
      {id: 3, title: '333'},
      {id: 4, title: '444'}
    ],
    num: 0
  },
  // 处理同步操作
  reducers: {
    setNum(state, {payload}) {
      // 不能直接修改state中的值，需要返回一个新的state
      return {...state, ...payload};
    },
    change(state, {payload}) {
      return {...state, ...payload};
    }
  },
  // 处理异步操作与逻辑
  effects: {
    * list({payload}, {call, put, select}) {
      console.log(payload);
      const data = yield request('http://localhost:8080/user', {method: 'GET'});
      yield put({type: 'change', payload: data});
    },
    * test(action, {put}) {
      const {payload} = action;
      yield put({
        type: 'change',
        payload: {
          num: payload.num,
          list: ['hello', 'world']
        }
      });
    },
    * setNumAsync({payload}, {call, put, select}) {
      // 调用reduces中方法更改状态
      yield put({
        type: 'setNum',
        payload: {
          num: payload.num
        }
      });
    },
    * getTopics({payload}, {call, put, select}) {
      const {data} = payload;
      const params = {
        // data,
        page: 1,
        limit: 10,
        tab: 'good'
      };
      const res = yield call(api.getList, params);
      const list = res.data.data;
      yield put({
        type: 'change',
        payload: {
          list
        }
      });
    }
  },
  // 订阅数据源,再进行dispatch相应的action
  subscriptions: {
    // setup({dispatch, history}) {  // eslint-disable-line
    //   history.listen((data) => {
    //     if (data.pathname === '/user') {
    //       console.log('subscriptions', history, data);
    //     }
    //   });
    // }
  }
};
