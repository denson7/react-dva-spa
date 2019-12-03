import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Button, Icon, Menu, Row, Col, Popover, Avatar} from 'antd';
import {withRouter, Router, Route, Switch, Redirect, Link} from 'dva/router';

import menuConfig from '@config/menu';
import {storage} from '@utils/tools';
// import ava from '@assets/images/logo.jpg';
import './index.less';

const {SubMenu, Item, ItemGroup} = Menu;



// 左侧导航组件
class Index extends Component {
  state = {
    current: 'mail',
  };

  componentDidMount() {
  }

  // 注销登陆
  logout = () => {
    // 弹窗
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        storage.removeItem('user_key');
        // 跳转到login
        this.props.history.replace('/login');
      },
      onCancel() {
        //
      }
    });
  };

  logout2 = () => {
    storage.removeItem('user_key');
    // 跳转到login
    this.props.history.replace('/login');
  };

  dropDownList = () => (
    <ul>
      <li>
        <Link to="/" onClick={this.logout2}>
          <Icon type="poweroff" /> 退出
        </Link>
      </li>
    </ul>
  );

  // 菜单栏折叠
  toggle = () => {
    const {dispatch, isCollapseLeftNav} = this.props;
    dispatch({
      type: 'admin/change',
      payload: {
        isCollapseLeftNav: !isCollapseLeftNav
      }
    });
  };

  getTitle = () => {
    let title = '';
    const path = this.props.location.pathname;
    menuConfig.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
        if (cItem) {
          // 设置title
          title = cItem.title;
        }
      }
    });
    return title;
  };

  render() {
    const {isCollapseLeftNav} = this.props;
    const user = storage.getItem('user_key');
    return (
      <div className="header">
        <Row>
          <Col span={23}>
            <Menu
              theme="dark"
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Item key="mail">
                <Icon type="mail"/>
                Navigation One
              </Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper"><Icon type="setting"/>Navigation Three</span>
                }
              >
                <ItemGroup title="Item 1">
                  <Item key="setting:1">Option 1</Item>
                  <Item key="setting:2">Option 2</Item>
                </ItemGroup>
                <ItemGroup title="Item 2">
                  <Item key="setting:3">Option 3</Item>
                  <Item key="setting:4">Option 4</Item>
                </ItemGroup>
              </SubMenu>
            </Menu>
          </Col>
          <Col span={1} style={{lineHeight: "40px"}}>
            <Popover
              placement="bottomRight"
              title={`欢迎 ${user.username}`}
              overlayClassName="navbar-popup"
              content={this.dropDownList()}
              trigger="click"
            >
              <Avatar style={{ backgroundColor: '#f0f2f5' }} icon="user" />
            </Popover>
          </Col>
        </Row>
        <div className="header-bottom">
          <Icon
            className="trigger"
            type={isCollapseLeftNav ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
            style={{margin: '4px 5px 4px 0'}}
          />
          <div>{this.getTitle()}</div>
        </div>
      </div>
    );
  }
}

export default connect(({admin}) => {
  const {isCollapseLeftNav} = admin;
  return {
    isCollapseLeftNav
  };
})(withRouter(Index));
