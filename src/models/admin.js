export default {
  namespace: 'admin',
  state: {
    activePath: '',
    // 菜单栏是否折叠
    isCollapseLeftNav: false
  },
  // 处理同步操作
  reducers: {
    change(state, {payload}) {
      return {...state, ...payload};
    }
  },
  // 处理异步操作与逻辑
  effects: {
  },
  subscriptions: {}
};
