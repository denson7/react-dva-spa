import React, {Component} from 'react';
import {withRouter, Router, Route, Switch, Redirect, Link} from 'dva/router';
import {Menu, Icon} from 'antd';
import {connect} from 'dva';

import menuList from '@config/menu';
import {storage} from '@utils/tools';
import './index.less';

const {SubMenu, Item} = Menu;

// 左侧导航组件
class Index extends Component {
  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuList(menuList);
  }

  // 判断当前登陆用户是否有对item的权限
  checkPerm = (item) => {
    const user = storage.getItem('user_key');
    const permissions = user && user.role.permissions || [];
    if (user.username === 'admin' || item.isPublic || permissions.indexOf(item.key) !== -1 ) {
      return true;
    } else if (item.children) {
      // 判断子item的key是否在permissions中
      const cItem = item.children.find(o => permissions.indexOf(o.key) !== -1);
      return !!cItem;
    }
    return false;
  };

  // 获取菜单列表
  getMenuList = (menuList) => {
    const {location} = this.props;
    // 获取路由
    const path = location.pathname;
    return menuList.reduce((res, item) => {
      const {key, icon, title, children} = item;
      if (this.checkPerm(item)) {
        if (!children) {
          res.push(
            <Item key={key}>
              <Link to={key}>
                <Icon type={icon}/>
                <span>{title}</span>
              </Link>
            </Item>
          );
        } else {
          // 设置展开项
          const curItem = children.find(o => path.indexOf(o.key) === 0);
          if (curItem) {
            this.openKey = key;
          }
          res.push(
            <SubMenu
              key={key}
              title={
                <span>
                  <Icon type={icon}/>
                  <span>{title}</span>
                </span>
              }
            >
              {this.getMenuList(children)}
            </SubMenu>
          );
        }
      }
      return res;
    }, []);
  };

  // 获取菜单列表
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      const {key, icon, title, children} = item;
      // 返回<Item>
      if (!children) {
        return (
          <Item key={key}>
            <Link to={key}>
              <Icon type={icon}/>
              <span>{title}</span>
            </Link>
          </Item>
        );
      } else {
        // 返回<SubMenu>
        return (
          <SubMenu
            key={key}
            title={
              <span>
                <Icon type={icon}/>
                <span>{title}</span>
              </span>
            }
          >
            {this.getMenuNodes(children)}
          </SubMenu>
        );
      }
    });
  };

  componentDidMount() {
  }

  render() {
    // 得到请求的路由路径
    let path = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <h1>Admin</h1>
        </Link>
        <Menu
          theme="dark" // light | dark
          mode="inline"
          // defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Index);

