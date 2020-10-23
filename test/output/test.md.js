import React from 'react';
import { Link } from 'react-router-dom';
import img___a_png_1 from './a.png';
import img___hahaha_2 from './hahaha';
import Pre from 'D:/project/react-code-markdown-loader/lib/components/Pre';
import DemoViewer from 'D:/project/react-code-markdown-loader/lib/components/DemoViewer';
import * as DemoDemoMd from 'D:/project/react-code-markdown-loader/test/demo/demo.md';
export const resourcePath = "D:/project/react-code-markdown-loader/test/test.md";
export const idList = [["InfinitySlider 跑马灯","h1","InfinitySlider%20%u8DD1%u9A6C%u706F"],["使用场景","h2","%u4F7F%u7528%u573A%u666F"],["API","h2","API"],["Props:","h3","Props%3A"]];
export default (props) => (<React.Fragment><h1 id="InfinitySlider%20%u8DD1%u9A6C%u706F">InfinitySlider 跑马灯</h1><p>跑马灯组件，适合轮播图片使用。</p>
<p>这个效果是模仿 <a href="https://www.apple.com/tv/" target="_blank">AppleTV 官网</a> 的效果，同时支持手动拖拽</p>
<h2 id="%u4F7F%u7528%u573A%u666F">使用场景</h2>
<p>你可以在 首页或需要进行轮播内容展示 的场景下使用本组件。</p>
<h2 id="API">API</h2>
<h3 id="Props%3A">Props:</h3>
<table>
<thead>
<tr>
<th align={null}>属性</th>
<th align={null}>说明</th>
<th align={null}>类型</th>
<th align={null}>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td align={null}>itemWidth</td>
<td align={null}>单个内容的宽度</td>
<td align={null}>number</td>
<td align={null}>200</td>
</tr>
<tr>
<td align={null}>data</td>
<td align={null}>数据</td>
<td align={null}>{"{"} width?:number {"}"}[]</td>
<td align={null}><code>[]</code></td>
</tr>
<tr>
<td align={null}>children</td>
<td align={null}><p>渲染每个 item 的内容</p><p>item 为 data 迭代的内容</p><p>offset 为当前内容的偏移位置</p></td>
<td align={null}>function(item, index, {"{"} offset, key {"}"})</td>
<td align={null}>-</td>
</tr>
</tbody>
</table>
<Pre><code className="language-jsx" dangerouslySetInnerHTML={{__html:"import React from &quot;react&quot;;\nimport { Modal } from &quot;antd&quot;;\n\nclass Demo extends React.Component {\n  state = {\n    visible: true,\n  };\n\n  render() {\n    const { visible } = this.state;\n\n    return (\n      &lt;div&gt;\n        &lt;button onClick={() =&gt; this.setState({ visible: true })}&gt;弹出窗口&lt;/button&gt;\n        &lt;Modal\n          visible={visible}\n          onOk={() =&gt; this.setState({ visible: false })}\n          onCancel={() =&gt; this.setState({ visible: false })}\n        &gt;\n          这里是弹框的内容\n        &lt;/Modal&gt;\n      &lt;/div&gt;\n    );\n  }\n}\n\nexport default Demo;\n"}} /></Pre>
<p><img src={img___hahaha_2} /></p>
<p><img src={img___a_png_1} alt="img" /></p><DemoViewer meta={DemoDemoMd.meta} detail={DemoDemoMd.md} src={DemoDemoMd.code} sources={DemoDemoMd.allCode} children={DemoDemoMd.default && <DemoDemoMd.default />} /></React.Fragment>)


    