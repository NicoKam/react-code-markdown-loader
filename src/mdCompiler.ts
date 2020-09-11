import toJSX from '@mapbox/hast-util-to-jsx';

function mdCompiler() {
  const { markdownWrapper } = this.options;
  this.Compiler = (ast) => {
    const { meta = {} } = this;
    let title = '';
    if (typeof meta.title === 'string') title = meta.title;
    if (meta.title && typeof meta.title['zh-CN'] === 'string') title = meta.title['zh-CN'];

    if(title){
      ast.children.unshift({
        type: 'element',
        tagName: 'h1',
        properties: {
          id: escape(title),
        },
        children: [
          {
            type: 'text',
            value: title,
          },
        ],
      });
    }
    let jsx = toJSX(ast, { wrapper: 'fragment' }) || '';

    if(markdownWrapper){
      jsx = `<MarkdownWrapper>${jsx}</MarkdownWrapper>`;
    }
    this.docUtils.pushCode(`export default (props) => (${jsx.replace(/dangerously-set-inner-h-t-m-l/g,'dangerouslySetInnerHTML')})`);
    return this.docUtils.toString();
  };
}

export default mdCompiler