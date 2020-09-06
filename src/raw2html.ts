import visit from 'unist-util-visit';
import ref from './ref';

export default () => (ast) => {
  visit(ast, 'raw', (node, i, parent) => {
    node.type = 'element';
    node.tagName = 'span';
    node.children = [];
    node.properties = {
      dangerouslySetInnerHTML: ref(`{__html:${JSON.stringify(node.value)}}`),
    };
    node.value = undefined;

  });
};
