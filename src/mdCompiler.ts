import toJSX from '@mapbox/hast-util-to-jsx';

function mdCompiler() {
  this.Compiler = (ast) => {
    // console.log(JSON.stringify(ast, null, '  '));
    let jsx = toJSX(ast, { wrapper: 'fragment' }) || '';
    this.docUtils.pushCode(`export default () => (${jsx.replace(/dangerously-set-inner-h-t-m-l/g,'dangerouslySetInnerHTML')})`);
    return this.docUtils.toString();
  };
}

export default mdCompiler