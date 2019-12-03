import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Button, Table, Modal} from 'antd';

import {formateDate, storage} from '@utils/tools';
import ShowDialog from './ShowDialog';

class App extends Component {
  componentDidMount() {
    //
  }

  get columns() {
    return [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'roleId'
      },
      {
        title: '操作',
        render: (item) => (
          <span>
            <Button onClick={() => this.handleEdit(item)}>修改</Button>
            &nbsp;&nbsp;
            <Button onClick={() => this.handleDel(item)}>删除</Button>
          </span>
        )
      }
    ];
  }

  // 修改
  handleEdit = (curDetail) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/change',
      payload: {
        curDetail,
        isShowDialog: true
      }
    });
  };

  // 删除按钮
  handleDel = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗?`,
      onOk: () => this.handleDelOne(user.id)
    });
  };

  // 删除用户
  handleDelOne = (userId) => {
    const {users, dispatch} = this.props;
    const newArr = users.filter((item) => item.id !== userId);
    dispatch({
      type: 'user/change',
      payload: {
        users: newArr
      }
    });
  };

  // 添加用户
  handleAddUser = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/change',
      payload: {
        isShowDialog: true
      }
    });
  };

  // 关闭弹窗
  handleCloseDialog =() => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/change',
      payload: {
        isShowDialog: false
      }
    });
  };

  AddOrUpdateUser = async () => {
    const {users, dispatch} = this.props;
    // 获取表单数据
    const user = this.form.getFieldsValue();
    // console.log('AddOrUpdateUser', user);
    this.form.resetFields();
    let res = [];
    // 判断是新增还是修改
    if (!user["id"]) {
      const obj = users.find(o => o.id === user.id);
      users.map(o => {
        if (o.id === user.id) {
          o.username = user.username;
          o.email = user.email;
          o.phone = user.phone;
          o.roleId = user.roleId;
          o.createTime = new Date();
        }
        res.push(o);
      });
    } else {
      user.id = Math.random();
      res = [...users, user];
    }


    dispatch({
      type: 'user/change',
      payload: {
        users: res,
        isShowDialog: false
      }
    });
  };

  render() {
    const {users, roles, isShowDialog, curDetail} = this.props;
    const title = <Button type="primary" onClick={this.handleAddUser}>创建用户</Button>;
    return (
      <div>
        <Card title={title} loading={false} bordered={true}>
          <Table
            columns={this.columns}
            rowKey="id"
            dataSource={users}
            bordered
            pagination={{defaultPageSize: 10, showQuickJumper: true}}
          />
          <Modal
            title={curDetail.id ? '修改用户' : '添加用户'}
            visible={isShowDialog}
            onCancel={() => this.handleCloseDialog()}
            onOk={this.AddOrUpdateUser}
          >
            <ShowDialog
              setForm={(form) => this.form = form}
              item={curDetail}
              roles={roles}
            />
          </Modal>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {users, isShowDialog, roles, curDetail} = state.user;
  return {
    users,
    isShowDialog,
    curDetail,
    roles
  };
}


export default connect(mapStateToProps)(App);
