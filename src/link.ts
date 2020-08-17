import visit from 'unist-util-visit';
import has from 'hast-util-has-property';
import is from 'hast-util-is-element';

export default () => (ast) => {
  visit(ast, 'element', (node, i, parent) => {
    if (is(node, 'a') && has(node, 'href')) {
      const href = node.properties.href;
      if (/^https?:/.test(href)) {
        /* do nothing */
      } else if (/^(\.|\/)/.test(href)) {
        node.tagName = 'Link'
        node.properties.to = href;
      }
    }
  });
};
