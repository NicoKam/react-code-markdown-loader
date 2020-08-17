import visit from 'unist-util-visit';
import has from 'hast-util-has-property';
import is from 'hast-util-is-element';

export default () => (ast) => {
  console.log(JSON.stringify(ast, null, '  '));
};
