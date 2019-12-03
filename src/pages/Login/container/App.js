import React, {Component} from 'react';
import {connect} from 'dva';
import {Link, withRouter, Redirect} from 'dva/router';
import {Form, Layout, Button, Icon, Input, Checkbox, Spin, message} from 'antd';

// import logoImg from '@assets/images/logo.jpg';
import {storage} from '@utils/tools';
import './index.less';

const FormItem = Form.Item;

class Login extends Component {
  componentDidMount() {
  }

  // 提交
  handleSubmit = (e) => {
    const {form, dispatch} = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // dispatch({
        //   type: 'login/login',
        //   payload: values
        // });
        // console.log('values', values);
        const result = {
          status: 0,
          data: {
            _id: '12345',
            username: values.username,
            password: values.password,
            createTime: 15546291355,
            __v: 0,
            role: {
              permissions: []
            }
          },
          msg: 'xxx'
        };
        // 登陆请求成功
        if (result.status === 0) {
          const user = result.data;
          // 保存到localStorage
          storage.setItem('user_key', user);
          // 跳转到admin  location/match/history
          this.props.history.push('/');
        } else { // 登陆请求失败
          message.error(result.msg);
        }
      }
    });
  };

  // 自定义验证校验密码
  validatePwd = (rule, value, callback) => {
    value = value.trim();
    if (!value) {
      callback('密码必须输入');
    } else if (value.length < 4) {
      callback('密码不能小于4位');
    } else if (value.length > 12) {
      callback('密码不能大于12位');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成');
    } else {
      // 通过
      callback();
    }
  };

  render() {
    const {loggedIn, form} = this.props;
    const {getFieldDecorator} = form;
    // 判断用户是否登陆
    const user = storage.getItem('user_key');
    if (user) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="login">
        <div className="login-content">
          <Spin tip="登录中..." spinning={!!loggedIn}>
            <h1>用户登陆</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('username', {
                  initialValue: 'admin', // 初始值
                  rules: [
                    {required: true, whitespace: true, message: '用户名必须输入!'},
                    {min: 4, message: '用户名不能小于4位!'},
                    {max: 12, message: '用户名不能大于12位!'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!'}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="请输入用户名"
                  />)
                }
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: 'admin',
                  rules: [ // 自定义验证
                    {validator: this.validatePwd}
                  ]
                })(<Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="password"
                  placeholder="请输入密码"
                />)
                }
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>记住我</Checkbox>)}
                <Link className="login-form-forgot" to="#">
                  忘记密码
                </Link>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登 陆
                </Button>
                <div className="new-user">
                  新用户？<Link to="/register">现在注册</Link>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
}

function mapStateToProps({login}) {
  return {login};
}

export default connect(mapStateToProps)(Form.create()(withRouter(Login)));
