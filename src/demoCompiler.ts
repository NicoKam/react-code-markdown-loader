import { isSourceCode } from './common';
import { toString } from 'hast-util-to-string';
import toJSX from '@mapbox/hast-util-to-jsx';
import DocUtils from './utils/DocUtils';

function hasReactImport(code = '') {
  return /from\s+('|")react\1/.test(code);
}

export default function () {
  let md;
  this.Compiler = () => {
    const { demoCode } = this;
    const docUtils: DocUtils = this.docUtils;
    let code = '';
    const allCode = demoCode
      .slice()
      .reverse()
      .filter(({ type, content }) => {
        if (!code && isSourceCode(type)) {
          code = content;
          return false;
        }
        return true;
      });

    const importReact = hasReactImport(code) ? '' : "import React from 'react';";
    docUtils.lpushCode(code);
    docUtils.lpushCode(importReact);
    docUtils.pushCode(`export const meta = ${JSON.stringify(this.meta)};`);
    docUtils.pushCode(`export const md = (${md});`);
    docUtils.pushCode(`export const code = (${JSON.stringify(code)});`);
    docUtils.pushCode(`export const allCode = (${JSON.stringify(allCode.reverse())});`);

    return docUtils.toString();
  };

  return (ast) => {
    md = toJSX(ast, { wrapper: 'fragment' }) || '';
    md = md.replace(/dangerously-set-inner-h-t-m-l/g, 'dangerouslySetInnerHTML');
  };
}
