import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class ShowDialog extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    item: PropTypes.object,
    roles: PropTypes.array
  };

  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 16}
    };

    const {item, roles} = this.props;
    const {username, id, phone, email, roleId} = item;
    return (
      <Form {...formItemLayout}>
        <FormItem label="">
          {
            getFieldDecorator('id', {
              initialValue: id
            })(<Input type="hidden" value={id}/>)
          }
        </FormItem>
        <FormItem label="用户名">
          {
            getFieldDecorator('username', {
              initialValue: username
            })(<Input type="text" placeholder="请输入用户名"/>)
          }
        </FormItem>
        {
          !id ?
            (
              <FormItem label="密码">
                {
                  getFieldDecorator('password', {
                    initialValue: ''
                  })(<Input type="password" placeholder="请输入密码"/>)
                }
              </FormItem>
            ) : null
        }
        <FormItem label="手机号">
          {
            getFieldDecorator('phone', {
              initialValue: phone
            })(<Input type="phone" placeholder="请输入手机号"/>)
          }
        </FormItem>
        <FormItem label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: email
            })(<Input type="email" placeholder="请输入邮箱"/>)
          }
        </FormItem>
        <FormItem label="角色">
          {
            getFieldDecorator('roleId', {
              initialValue: roleId,
              rules: [
                {required: true, message: '必须指定角色'}
              ]
            })(
              <Select style={{width: 200}} placeholder="请选择角色">
                {roles.map(role => <Option key={role.id} value={role.value}>{role.name}</Option>)}
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ShowDialog);
