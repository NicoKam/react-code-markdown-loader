import DocUtils from './utils/DocUtils';

import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import report from 'vfile-reporter';
import marked from 'marked';
import toJSX from '@mapbox/hast-util-to-jsx';
import link from './link';
import id from './id';
import meta from './meta';

const transformer = require('@umijs/preset-dumi/lib/transformer').default;

function docUtils() {
  this.docUtils = new DocUtils();
  this.docUtils.addImport('react', 'React');
  this.docUtils.addImport('react-router-dom', undefined, ['Link']);
}

function compiler() {
  this.Compiler = (ast) => {
    // console.log(JSON.stringify(ast, null, '  '));
    let jsx = toJSX(ast, { wrapper: 'fragment' }) || '';
    this.docUtils.pushCode(`export default () => (${jsx})`);
    return this.docUtils.toString();
  };
}

module.exports = function (content, context) {
  // console.log(marked(content.toString()));

  // const result = transformer.markdown(content, this.resource);

  // console.log(Object.keys(result),result);

  unified()
    .use(docUtils)
    .use(markdown)
    .use(id)
    .use(remark2rehype)
    .use(link)
    .use(meta)
    // .use(doc)
    // .use(format)
    // .use(html)
    .use(compiler)
    .process(content, function (err, file) {
      console.error(report(err || file));
      console.log(String(file));
    });
  this.callback(null, 'export default ""');
  // this.callback(null, result.content);
};

module.exports.raw = true;
