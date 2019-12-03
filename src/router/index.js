import React from 'react';
import { Router, Route, Switch, Redirect} from 'dva/router';
import dynamic from 'dva/dynamic';

/**
 *
 * @param history 路由中的history对象
 * @param app dva实例,加载 models需要
 */
function RouterConfig({history, app}) {
  // 动态加载
  // const User = dynamic({
  //   app,
  //   // models: () => [import('../models/user')],
  //   component: () => import('../pages/user')
  // });
  const Login = dynamic({
    app,
    component: () => import('@pages/Login')
  });

  const Admin = dynamic({
    app,
    component: () => import('@pages/Admin')
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
