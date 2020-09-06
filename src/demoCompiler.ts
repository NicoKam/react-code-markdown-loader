import toJSX from '@mapbox/hast-util-to-jsx';

function hasReactImport(code = '') {
  return /from\s+('|")react\1/.test(code);
}

export default function () {
  let md;
  this.Compiler = () => {
    const { demoCode } = this;
    const code = demoCode[demoCode.length - 1];

    const metaCode = `export const meta = ${JSON.stringify(this.meta)};`;
    const mdCode = `export const md = (${md});`;
    const codeCode = `export const code = (${JSON.stringify(code)});`;
    const importReact = hasReactImport(code) ? '' : "import React from 'react';";

    return `${importReact}
${code || ''}
${codeCode}
${mdCode}
${metaCode}`;
  };
  return (ast) => {
    md = toJSX(ast, { wrapper: 'fragment' }) || '';
    md = md.replace(/dangerously-set-inner-h-t-m-l/g, 'dangerouslySetInnerHTML');
  };
}