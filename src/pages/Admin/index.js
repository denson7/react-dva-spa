import React, {Component} from 'react';
import {withRouter, Router, Route, Switch, Redirect} from 'dva/router';
import {Layout, Icon} from 'antd';
import {connect} from 'dva';

// import NotFound from '@components/NotFound';
import {storage} from '@utils/tools';
import LeftNav from '../LeftNav';
import Header from '../Header';
import Home from '../Home';
import User from '../User';
import Role from '../Role';
import Category from '../Category';
import Product from '../Product';
import Charts from '../Charts';
import Test from '../Test';

const {Footer, Sider, Content } = Layout;

// 后台入口
class Index extends Component {
  componentDidMount() {
  }

  render() {
    const {isCollapseLeftNav} = this.props;
    const user = storage.getItem('user_key');
    // 判断是否有登陆
    if (!user) {
      // 自动跳转
      return <Redirect to="/login"/>;
    }
    const path = this.props.location.pathname;
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={isCollapseLeftNav}
        >
          <LeftNav />
        </Sider>
        <Layout>
          <Header path={path} />
          <Content style={{margin: 25}}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/test" component={Test} />
              <Route path="/charts" component={Charts} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>
            xxxx
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(({admin}) => {
  const {isCollapseLeftNav} = admin;
  return {
    isCollapseLeftNav
  };
})(withRouter(Index));

