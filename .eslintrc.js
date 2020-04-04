module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // 缩进风格
      'indent': [2, 4],
      // 语句强制分号结尾
      'semi': [2, 'always'],
      // 注释风格空格
      'spaced-comment': 2,
      // 必须使用 if(){} 中的{}
      'curly': [2, 'all'],
      // switch语句最后必须有default
      'default-case': 2,
      // 引号风格 `` "" ''
      'quotes': [1, 'single'],
      // 命名检测
      'id-match': 2,
      // 要求使用 const 声明
      'prefer-const': 0,
      '@typescript-eslint/no-explicit-any': 'off'
  }
}
