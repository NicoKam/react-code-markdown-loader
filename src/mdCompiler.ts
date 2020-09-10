import toJSX from '@mapbox/hast-util-to-jsx';

function mdCompiler() {
  const { markdownWrapper } = this.options;
  this.Compiler = (ast) => {
    // console.log(JSON.stringify(ast, null, '  '));
    let jsx = toJSX(ast, { wrapper: 'fragment' }) || '';
    if(markdownWrapper){
      jsx = `<MarkdownWrapper>${jsx}</MarkdownWrapper>`;
    }
    this.docUtils.pushCode(`export default (props) => (${jsx.replace(/dangerously-set-inner-h-t-m-l/g,'dangerouslySetInnerHTML')})`);
    return this.docUtils.toString();
  };
}

export default mdCompiler