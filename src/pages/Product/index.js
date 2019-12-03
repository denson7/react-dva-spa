import React, { Component } from 'react';
import { Card, Layout, Col, Row, Content, Icon } from 'antd';

export default class Index extends Component {
  render() {
    return (
      <Card>
        <Row gutter={20}>
          <Col md={6}>
            <div>
              <Icon type="qq" antd />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <Icon type="wechat" antd />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <Icon type="skype" antd />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <Icon type="github" antd />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
