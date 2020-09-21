---
title: this is title
test: aaa
---


# antd-tools ModalHolder

api在底部 

我们都知道，`Modal`组件通过它的`visible`属性，就可以控制弹窗的显示隐藏。比如下面这一段代码

点击[这里](http://www.baidu.com/)打开新的连接

```jsx
import React from "react";
import { Modal } from "antd";

class Demo extends React.Component {
  state = {
    visible: true,
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ visible: true })}>弹出窗口</button>
        <Modal
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
        >
          这里是弹框的内容
        </Modal>
      </div>
    );
  }
}

export default Demo;
```

<img src="./hahaha" />