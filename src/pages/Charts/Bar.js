import React from 'react';
import { Layout, Col, Row } from 'antd';
const { Content } = Layout;
import Line from './Line';

class Bar extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <Content>
          <Row gutter={20}>
            <Col md={8}>
              <Line />
            </Col>
            <Col md={8}>
              <Line />
            </Col>
            <Col md={8}>
              <Line />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Bar;
