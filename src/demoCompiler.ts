import { isSourceCode } from './common';
import { toString } from 'hast-util-to-string';
import toJSX from '@mapbox/hast-util-to-jsx';

function hasReactImport(code = '') {
  return /from\s+('|")react\1/.test(code);
}

export default function () {
  const { markdownWrapper } = this.options;

  let md;
  this.Compiler = () => {
    const { demoCode } = this;
    let code = '';
    const allCode = demoCode
      .slice()
      .reverse()
      .filter(({ type, value }) => {
        if (!code && isSourceCode(type)) {
          code = value;
          return false;
        }
        return true;
      });

    const metaCode = `export const meta = ${JSON.stringify(this.meta)};`;
    const mdCode = `export const md = (${md});`;
    const codeCode = `export const code = (${JSON.stringify(code)});`;
    const allCodeCode = `export const allCode = (${JSON.stringify(
      allCode.reverse(),
    )});`;
    const importReact = hasReactImport(code) ? '' : "import React from 'react';";

    return `${markdownWrapper ? `import MarkdownWrapper from '${markdownWrapper}';` : ''}
${importReact}
${code || ''}
${codeCode}
${mdCode}
${allCodeCode}
${metaCode}`;
  };
  return (ast) => {
    md = toJSX(ast, { wrapper: 'fragment' }) || '';
    md = md.replace(/dangerously-set-inner-h-t-m-l/g, 'dangerouslySetInnerHTML');
    if (markdownWrapper) {
      md = `<MarkdownWrapper>${md}</MarkdownWrapper>`;
    }
  };
}
