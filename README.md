# react-code-markdown-loader

这是一个`webpack-loader`，它能够将`markdown`文件解析为 React 组件。

组件的功能和目前许多的`markdown-loader`类似，但该`loader`不同的是，它更倾向于包含源码的文档渲染。

如果你的 markdown 文件的目录中，包含 demo 子目录，该`loader`可以自动扫描目录下的所有`md`文件，并将它们引入到该文档中。

## Usage

webpack.config.js:

```javascript
export default = {
  module: {
    rules: [
      {
        test: /\.md?$/,
        use: [
          'babel-loader',
          {
            'react-code-markdown-loader',
            options: {
              // auto scan demo/*.md
              autoScanDemo: true,
              // Wrapper will contain the md-doc jsx
              markdownWrapper: 'path/to/your/wrapper',
              // add custom props to your Wrapper: <MarkdownWrapper nav={idList} wrapperProp="value" >{markdownJSX}</MarkdownWrapper>
              markdownWrapperProps: ['nav={idList}', 'wrapperProp="value"'],
            },
          },
        ],
      },
      // ...other rules
    ]
  }
  // ...other config
}
```

## Options

### markdownWrapper

自定义 Markdown 包裹组件，可用自定义样式覆盖

### markdownWrapperProps

添加自定义属性到你的MarkdownWrapper上

### autoScanDemo

是否自动扫描 demo 目录的文档并自动加入解析
