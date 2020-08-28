import visit from 'unist-util-visit';
import has from 'hast-util-has-property';
import is from 'hast-util-is-element';
import { writeFile } from 'fs';

export default function () {
  return (ast) => {
    if (ast.children && ast.children.length > 0 && ast.children[0].type === 'code' && ast.children[0].lang === 'meta') {
      const value = ast.children[0].value;
      const meta = {};
      value.split('\n').forEach((line) => {
        const [key, value] = line.split(':');
        meta[key.trim()] = value.trim();
      });
      this.docUtils.pushCode(`const meta = ${JSON.stringify(meta)}`);
      this.docUtils.addExport(['meta']);
      ast.children.splice(0, 1);
    }
  };
}
