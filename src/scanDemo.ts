import _glob from 'glob';
import slash from 'slash';
import { promisify } from 'util';
import { dirname, resolve } from 'path';
import { pascalCase } from 'change-case';
import ref from './ref';

const glob = promisify(_glob);

export default (sourcePath) =>
  function () {
    return async (ast) => {
      const curDir = dirname(sourcePath);
      const mdDemo = await glob(slash(resolve(curDir, 'demo/*.md')));
      this.docUtils.addImport(slash(resolve(__dirname, 'components/DemoViewer')), `DemoViewer`);
      mdDemo.forEach((src) => {
        const name = `Demo${pascalCase(src.substr(src.lastIndexOf('/') + 1))}`;
        this.docUtils.addImport(src, `* as ${name}`);
        ast.children.push({
          type: 'element',
          tagName: 'DemoViewer',
          // children: [
          //   {
          //     type: 'element',
          //     tagName: `${name}.default`,
          //     properties:{},
          //   },
          // ],
          properties: {
            meta: ref(`${name}.meta`),
            detail: ref(`${name}.md`),
            src: ref(`${name}.code`),
            sources: ref(`${name}.allCode`),
            children: ref(`${name}.default && <${name}.default />`),
          },
        });
      });
    };
  };
