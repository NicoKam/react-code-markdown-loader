import visit from 'unist-util-visit';
import has from 'hast-util-has-property';
import is from 'hast-util-is-element';
import toString from 'hast-util-to-string';

export default () => (ast) => {
  visit(ast, 'element', (node, i, parent) => {
    if (['h1', 'h2', 'h3', 'h4', 'h6'].includes(node.tagName)) {
      node.properties.id = escape(toString(node));
    }
  });
};
