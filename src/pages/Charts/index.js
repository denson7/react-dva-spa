import React, {Component} from 'react';
import {withRouter, Router, Route, Switch, Redirect} from 'dva/router';
import {Layout} from 'antd';
import {connect} from 'dva';

import {storage} from '@utils/tools';
import Bar from './Bar';
import Radar from './Radar';

class Index extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Switch>
        <Route path="/charts/bar" component={Bar} />
        <Route path="/charts/radar" component={Radar} />
      </Switch>
    );
  }
}
export default connect((state) => {
  return {
    ...state
  };
})(withRouter(Index));

