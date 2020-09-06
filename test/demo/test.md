---
order: 0
title:
  zh-CN: 基本用法
---

## zh-CN

Demo 描述

```jsx
import AlertExplain from "@ali-whale/alert-explain";

class Demo extends React.Component {
  render() {
    return (
      <AlertExplain
        message="说明性文本提示"
        description="使用OAuth 2.0协议进行用户认证和应用授权。阿里云目录支持常见的OAuth 2.0场景，例如用户登录到网络应用，本地应用后，应用以登录用户的身份访问阿里云API。"
        showIcon
      />
    );
  }
}

export default Demo;
```
<code src="../index.js" />
