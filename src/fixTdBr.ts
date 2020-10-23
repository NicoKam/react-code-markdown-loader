import visit from 'unist-util-visit';
import ArrayRemover from './utils/ArrayRemover';

/* 修复td随意换行的问题 */
export default function () {
  return (ast) => {
    visit(ast, 'element', (node, i, parent) => {
      if (node.tagName === 'td') {
        const remover = new ArrayRemover();
        visit(node, 'raw', (raw, i, parent) => {
          if (raw.value === '<br>' || raw.value === '<br />') {
            remover.mark(i);
          }
        });
        remover.splice(node.children);

        if (node.children.length > 1) {
          node.children = node.children.map((node) => ({
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [node],
          }));
        }
      }
    });
  };
}
