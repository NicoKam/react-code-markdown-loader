const visit = require('unist-util-visit');
const has = require('hast-util-has-property');
const is = require('hast-util-is-element');
const toString = require('hast-util-to-string');

module.exports = () => (ast) => {
  visit(ast, 'element', (node, i, parent) => {
    if (['h1', 'h2', 'h3', 'h4', 'h6'].includes(node.tagName)) {
      node.properties.id = escape(toString(node));
    }
  });
};
