const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true // 是公开的, 不需要进行权限检查
  },
  {
    title: '权限管理',
    key: '/pro',
    icon: 'appstore',
    children: [
      {
        title: '用户管理',
        key: '/user',
        icon: 'user'
      },
      {
        title: '角色管理',
        key: '/role',
        icon: 'safety'
      },
    ]
  },
  {
    title: '图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '折线图',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '多雷达图',
        key: '/charts/radar',
        icon: 'radar-chart'
      }
    ]
  },
  {
    title: '列表',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key: '/category',
        icon: 'bars'
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'tool'
      }
    ]
  },
  {
    title: '演示示例',
    key: '/test',
    icon: 'bug',
    isPublic: true
  }
];

export default menuList;
