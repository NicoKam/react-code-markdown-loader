import visit from 'unist-util-visit';

/* 修复td随意换行的问题 */
export default function () {
  return (ast) => {
    visit(ast, 'element', (node, i, parent) => {
      if (node.tagName === 'td') {
        const brIndex = [];
        visit(node, 'raw', (raw, i, parent) => {
          if (raw.value === '<br>' || raw.value === '<br />') {
            brIndex.push(i);
          }
        });

        let index = 0;
        const children = [];
        while (index < node.children.length) {
          const next = brIndex.length > 0 ? brIndex.shift() : node.children.length;
          const length = next - index;
          if (length > 0) {
            children.push({
              type: 'element',
              tagName: 'p',
              properties: {},
              children: node.children.slice(index, next),
            });
          }

          index = next + 1;
        }
        node.children = children;
      }
    });
  };
}
