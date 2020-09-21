import { resolve } from 'path';
import visit from 'unist-util-visit';
import slash from 'slash';
import ref from './ref';

function encodeHtml(str: string = '') {
  let s = '';
  if (str.length === 0) return '';
  s = str.replace(/&/g, '&amp;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  // s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/'/g, '&#39;');
  s = s.replace(/"/g, '&quot;');
  // s = s.replace(/\n/g, "<br/>");
  return s;
}

export default function () {
  return (ast) => {
    visit(ast, 'element', (node, i, parent) => {
      if (node.tagName === 'pre') {
        this.docUtils.addImport(slash(resolve(__dirname, 'components/Pre')), `Pre`);

        node.tagName = 'Pre';
        const codeElement = node.children[0];
        if (codeElement && codeElement.type === 'element' && codeElement.tagName === 'code') {
          const codeText = codeElement.children[0];
          if (codeText && codeText.type === 'text') {
            codeElement.children = [];
            codeElement.properties = codeElement.properties || {};
            codeElement.properties.dangerouslySetInnerHTML = ref(
              `{__html:${JSON.stringify(encodeHtml(codeText.value))}}`,
            );
          }
        }
      }
    });
  };
}
