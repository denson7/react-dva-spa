
##  React dva SPA
### 功能概述
- 权限管理
- 动态加载路由
- 按下加载Echarts组件
- 按需加载antd组件
- 登陆页
- 集成dva数据模式
### 目录结构
```
├── assets                   # 静态资源文件
│   ├── fonts                # 各页面目录
│   ├── images               # 各页面目录
│   └── styles               # 全局样式
├── config                   # webpack配置目录
├── public                   # 不参与编译的资源文件
├── src                      # 项目目录
│   ├── index.js             # 项目入口文件
│   ├── api                  # 预留接口目录
│   ├── components           # 全局公共组件
│   ├── config               # 项目配置目录
│   ├── modles               # Model目录
│   ├── pages                # 各页面目录
│   │   ├── Admin            # Admin
│   │   ├── Category         # Category
│   │   ├── Charts           # Charts
│   │   ├── Header           # Header
│   │   ├── Home             # Home
│   │   ├── LeftNav          # LeftNav
│   │   ├── Login            # Login
│   │   ├── Product          # Product
│   │   ├── User             # User
│   │   ├── Role             # Role
│   ├── routes               # 动态路由目录
│   │   └── index.js         # 路由配置文件
│   ├── services             # 存放异步请求文件
│   └── utils                # 项目帮助函数目录
├── .babelrc                 # babel配置文件
├── .eslintrc.js             # Eslint规则配置文件
├── package.json             # npm包文件
└── README.md                # README文件
```

### 使用说明
```bash
# 前置条件
# 需要安装node环境 (https://nodejs.org/en/)
# 查看node环境是否安装成功,示例
$ node -v 
v12.12.0
$ npm -v
6.11.3
# 全局安装eslint
$ npm install -g eslint
$ eslint -v
v6.7.1
# 克隆代码
$ git clone https://github.com/denson7/react-dva-spp.git
$ cd react-dva-spp
# 安装依赖
$ npm install
# 开发环境启动
$ npm run dev
# 检测代码是否符合eslint规则
$ npm run eslint
# 自动进行eslint修复
$ npm run fix
# 项目打包
$ npm run build
```
