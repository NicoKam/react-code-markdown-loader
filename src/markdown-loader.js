var unified = require('unified');
var markdown = require('remark-parse');
var remark2rehype = require('remark-rehype');
var html = require('rehype-stringify');
var report = require('vfile-reporter');
const marked = require('marked');
const toJSX = require('@mapbox/hast-util-to-jsx');
const link = require('./link');
const id = require('./id');

const transformer = require('@umijs/preset-dumi/lib/transformer').default;

function compiler() {
  this.Compiler = function (ast) {
    // console.log(JSON.stringify(ast, null, '  '));
    let jsx = toJSX(ast, { wrapper: 'fragment' }) || '';
    
    return jsx;
  };
}

module.exports = function (content, context) {
  // console.log(marked(content.toString()));

  // const result = transformer.markdown(content, this.resource);


  // console.log(Object.keys(result),result);

  unified()
    .use(markdown)
    .use(remark2rehype)
    .use(link)
    .use(id)
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
