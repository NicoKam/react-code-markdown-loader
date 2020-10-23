---
title: InfinitySlider
subtitle: 跑马灯
menu: true
category: general
order: 0
---

跑马灯组件，适合轮播图片使用。

这个效果是模仿 [AppleTV 官网](https://www.apple.com/tv/) 的效果，同时支持手动拖拽

## 使用场景

你可以在 首页或需要进行轮播内容展示 的场景下使用本组件。

## API

### Props:

| 属性      | 说明                                                                                    | 类型                                   | 默认值 |
| --------- | --------------------------------------------------------------------------------------- | -------------------------------------- | ------ |
| itemWidth | 单个内容的宽度                                                                          | number                                 | 200    |
| data      | 数据                                                                                    | { width?:number }[]                    | `[]`   |
| children  |  渲染每个 item 的内容<br>item 为 data 迭代的内容<br>offset 为当前内容的偏移位置 | function(item, index, { offset, key }) | -      |


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

![img](./a.png)