const visit = require('unist-util-visit');
const has = require('hast-util-has-property');
const is = require('hast-util-is-element');

module.exports = () => (ast) => {
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
