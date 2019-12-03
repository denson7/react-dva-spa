export default {
  namespace: 'home',
  state: {
  },
  reducers: {
    change(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
  },
  subscriptions: {
  }
};
