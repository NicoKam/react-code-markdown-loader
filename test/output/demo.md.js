import React from 'react';
import md from './test.md';
import demo from './demo/demo.md';

console.log(md);
console.log(demo);
export const resourcePath = 'D:/project/react-code-markdown-loader/test/demo/demo.md';
export const meta = { order: 0, title: { 'zh-CN': '基本用法' } };
export const md = <p>用于新闻详情等场景需要统计阅读量和点赞量的情况</p>;
export const code =
  "import md from './test.md';\nimport demo from './demo/demo.md';\n\nconsole.log(md);\nconsole.log(demo);";
export const allCode = [
  {
    content:
      'import NewsStatistic from "@ali-whale-mobile/photo-swipper";\n\nconst Demo = props => {\n  return <NewsStatistic read="2091" star="5" />;\n};\n\nexport default Demo;',
    type: 'jsx',
  },
];
