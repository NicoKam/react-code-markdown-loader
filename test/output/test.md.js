import React from 'react';
import { Link } from 'react-router-dom';
import img___hahaha from './hahaha';
import Pre from 'D:/project/react-code-markdown-loader/lib/components/Pre';
import DemoViewer from 'D:/project/react-code-markdown-loader/lib/components/DemoViewer';
import * as DemoDemoMd from 'D:/project/react-code-markdown-loader/test/demo/demo.md';
export default (props) => (<React.Fragment><h1 id="this%20is%20title">this is title</h1><h1 id="antd-tools%20ModalHolder">antd-tools ModalHolder</h1>
<p>api在底部 </p>
<p>我们都知道，<code>Modal</code>组件通过它的<code>visible</code>属性，就可以控制弹窗的显示隐藏。比如下面这一段代码</p>
<Pre><code className="language-jsx" dangerouslySetInnerHTML={{__html:"import React from &quot;react&quot;;\nimport { Modal } from &quot;antd&quot;;\n\nclass Demo extends React.Component {\n  state = {\n    visible: true,\n  };\n\n  render() {\n    const { visible } = this.state;\n\n    return (\n      &lt;div&gt;\n        &lt;button onClick={() =&gt; this.setState({ visible: true })}&gt;弹出窗口&lt;/button&gt;\n        &lt;Modal\n          visible={visible}\n          onOk={() =&gt; this.setState({ visible: false })}\n          onCancel={() =&gt; this.setState({ visible: false })}\n        &gt;\n          这里是弹框的内容\n        &lt;/Modal&gt;\n      &lt;/div&gt;\n    );\n  }\n}\n\nexport default Demo;\n"}} /></Pre>
<span><img src={img___hahaha} /></span><DemoViewer meta={DemoDemoMd.meta} detail={DemoDemoMd.md} src={DemoDemoMd.code} sources={DemoDemoMd.allCode} children={DemoDemoMd.default && <DemoDemoMd.default />} /></React.Fragment>)


    