import visit from 'unist-util-visit';
import ref from './ref';

export default function () {
  return (ast) => {
    visit(ast, 'raw', (node, i, parent) => {
      node.properties = {
        dangerouslySetInnerHTML: ref(`{__html:${JSON.stringify(node.value)}}`),
      };
      node.children = [];

      node.type = 'element';
      node.tagName = 'p';
      node.value = undefined;
    });
  };
}
