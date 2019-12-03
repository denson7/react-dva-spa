module.exports = {
  // 当前配置文件不能往父级查找
  'root': true,
  // 指定环境的全局变量
  'env': {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es6': true
  },
  // 配置标准的js风格 extends: 'standard',
  'extends': [
    // 启动的推荐规则
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  // babel-eslint解析
  'parser': 'babel-eslint',
  // 设置 JavaScript解析器选项 必选项
  'parserOptions': {
    // 额外的语言特性:
    'ecmaFeatures': {
      // 解构赋值
      "destructuring": true,
      // 允许在全局作用域下使用 return 语句
      'globalReturn': true,
      // impliedStric
      'impliedStrict': true,
      // 启用 JSX
      'jsx': true,
      'modules': true
    },
    'sourceType': 'module',
    // ECMAScript 版本
    'ecmaVersion': 6
  },
  // 提供插件 eslint支持 JSX start
  'plugins': [
    'react'
  ],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  'rules': {
    "block-spacing": 2,
    // (默认)使用双引号 double | single
    'quotes': [0, "single"],
    // 强制2个空格缩进
    "indent": ["error", 2],
    // 双峰驼命名格式
    "camelcase": 2,
    // 对var警告
    'no-var': 2,
    "no-unused-vars": 0,
    // (默认)要求在语句末尾使用分号
    'semi': 2,
    // 强制注释之后留有空格
    'spaced-comment': 2,
    //禁止修改const声明的变量
    'no-const-assign': 2,
    // 在创建对象字面量时不允许键重复
    'no-dupe-keys': 2,
    //switch中的case标签不能重复
    'no-duplicate-case': 2,
    // 函数参数不能重复
    'no-dupe-args': 2,
    // 块语句中的内容不能为空
    'no-empty': 2,
    // 禁止重复的函数声明
    'no-func-assign': 2,
    // 禁止重复声明变量
    'no-redeclare': 2,
    // 函数调用时 函数名与()之间不能有空格
    'no-spaced-func': 2,
    // 强制所有控制语句使用一致的括号风格
    "curly": [2, "all"],
    // 控制逗号前后的空格
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 禁止混用tab和空格
    "no-mixed-spaces-and-tabs": 2,
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true
    }],
    // 强制使用一致的换行风格
    "linebreak-style": [1, "windows"],
    // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
    "lines-around-comment": [1, {
      "beforeBlockComment": true
    }],
    // 使用 === 替代 == allow-null允许null和undefined==
    "eqeqeq": [2, "allow-null"],
    // 强制一行的最大长度
    "max-len": [1, 200],
    // 禁止重复模块导入
    "no-duplicate-imports": 2,
    //////////////
    //  React   //
    //////////////
    // 在数组或迭代器中验证JSX具有key属性,默认关闭
    "react/jsx-key": 2,
    // 强制在JSX属性（jsx-quotes）中一致使用双引号
    "jsx-quotes": [2, "prefer-double"],
    // 不使用弃用的方法
    "react/no-deprecated": 1,
    // 关闭属性
    "react/prop-types": 0,
    // 验证JSX中的props缩进
    "react/jsx-indent-props": [2, 2],
    // 在JSX中禁止未声明的变量
    "react/jsx-no-undef": 1,
    // 使用JSX时防止丢失React
    "react/react-in-jsx-scope": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2

  },
  'settings': {
    'import/ignore': [
      'node_modules'
    ],
    'react': {
      'version': 'detect'
    }
  }
};
