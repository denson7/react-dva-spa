import React, {Component} from 'react';
import {connect} from 'dva';

class App extends Component {
  componentDidMount() {
    //
  }

  handleClick() {
    const {dispatch} = this.props;
    dispatch({
      type: 'test/test',
      payload: {
        num: Math.floor(Math.random() * 100)
      }
    });
  }

  handleSetNum() {
    const {dispatch} = this.props;
    dispatch({
      type: 'test/setNum',
      payload: {
        num: 100
      }
    });
  }

  handleSetNumAsync = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'test/setNumAsync',
      payload: {
        num: 999
      }
    });
  };

  handleGetTopics = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'test/getTopics',
      payload: {
        data: 'get-list'
      }
    });
  };

  render() {
    const {num, list} = this.props;
    return (
      <div>
        随机数: {num}
        <br/>
        <button onClick={() => this.handleClick()}>生成一个随机数</button>
        <br/>
        <br/>
        <p></p>
        <button onClick={this.handleSetNum.bind(this)}>同步设置100</button>
        <br/>
        <br/>
        <button onClick={this.handleSetNumAsync}>异步设置999</button>
        <br/>
        <br/>
        <button onClick={this.handleGetTopics}>发送异步请求</button>
        <ul>
          {list.map((item, index) => {
            return (<li key={index}>{item.title}</li>);
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {num, list} = state.test;
  return {
    num,
    list
  };
}


export default connect(mapStateToProps)(App);
