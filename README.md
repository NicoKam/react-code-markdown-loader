# markdown-code-loader

这是一个`webpack-loader`，它能够将`markdown`文件解析为React组件。

组件的功能和目前许多的`markdown-loader`类似，但该`loader`不同的是，它更倾向于包含源码的文档渲染。

如果你的markdown文件的目录中，包含demo子目录，该`loader`会自动扫描目录下的所有`md`文件，并将它们引入到该文档中。