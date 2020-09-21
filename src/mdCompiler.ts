import toJSX from '@mapbox/hast-util-to-jsx';

function mdCompiler() {
  const { markdownWrapper,markdownWrapperProps } = this.options;
  this.Compiler = (ast) => {
  
    let jsx = toJSX(ast, { wrapper: 'fragment' }) || '';

    if(markdownWrapper){
      jsx = `<MarkdownWrapper ${markdownWrapperProps.join(' ')} >${jsx}</MarkdownWrapper>`;
    }
    this.docUtils.pushCode(`export default (props) => (${jsx.replace(/dangerously-set-inner-h-t-m-l/g,'dangerouslySetInnerHTML')})`);
    return this.docUtils.toString();
  };
}

export default mdCompiler