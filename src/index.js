import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import {createBrowserHistory as createHistory} from 'history/';
import 'antd/dist/antd.css';
import '@assets/styles/index.less';

const app = dva({
  history: createHistory(),
  // onError(e) {
  //   e.preventDefault();
  //   message.error(e.message, 3);
  // },
  // initialState,
  // onError,
  // onAction,
  // onStateChange,
  // onReducer,
  // onEffect,
  // onHmr,
  // extraReducers,
  // extraEnhancers,
});

// 注册插件
app.use(createLoading());

// 注册Model
// app.model(require('./pages/home/model').default);
require('./models').default.forEach(key => app.model(key.default));

// 注册路由
app.router(require('./router').default);

// 启动
app.start('#root');
