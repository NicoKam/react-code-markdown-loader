import visit from 'unist-util-visit';
import toString from 'hast-util-to-string';
import { Plugin } from 'unified';

const id: Plugin = () => (ast) => {
  visit(ast, 'element', (node, i, parent) => {
    if (['h1', 'h2', 'h3', 'h4', 'h6'].includes(node.tagName)) {
      node.properties.id = escape(toString(node));
    }
  });
};
export default id;
