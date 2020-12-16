import _glob from 'glob';
import slash from 'slash';
import fs from 'fs';
import YAML from 'yaml';
import { promisify } from 'util';
import { dirname, resolve } from 'path';
import { pascalCase } from 'change-case';
import ref from './ref';

const glob = promisify(_glob);

/**
 * 分析demo中的order顺序，并返回排序后的demo路径
 * @param demoPathList demo的路径
 */
async function getOrderedDemo(demoPathList: string[]): Promise<string[]> {
  /* 分析Demo，取出内部的order */
  const demoWithOrder = await Promise.all(
    demoPathList.map(async (demoPath) => {
      const buffer = await fs.promises.readFile(demoPath);
      const fileContent = buffer.toString().trim();
      const contentArr = fileContent.split(/(\n|\r\n)/);
      if (contentArr[0] === '---') {
        const endIndex = contentArr.slice(1).findIndex((line) => line === '---');
        if (endIndex > 0) {
          /* 找到了末尾的--- */
          const yamlStr = contentArr.slice(1, endIndex).join('\n');
          try {
            const meta = YAML.parse(yamlStr);
            return {
              path: demoPath,
              order: meta.order || 0,
            };
          } catch (error) {
            /* parse失败 */
            console.warn('Demo meta parse error: ', demoPath);
            console.error(error);
          }
        }
      }

      /* 默认返回0 */
      return {
        path: demoPath,
        order: 0,
      };
    }),
  );

  return demoWithOrder.sort((a, b) => a.order - b.order).map(({ path }) => path);
}

export default (sourcePath) =>
  function () {
    return async (ast) => {
      const curDir = dirname(sourcePath);
      let mdDemo = await glob(slash(resolve(curDir, 'demo/*.md')));
      // 对Demo进行排序
      mdDemo = await getOrderedDemo(mdDemo);
      this.docUtils.addImport(slash(resolve(__dirname, 'components/DemoViewer')), `DemoViewer`);
      mdDemo.forEach((src) => {
        const name = `Demo${pascalCase(src.substr(src.lastIndexOf('/') + 1))}`;
        this.docUtils.addImport(src, `* as ${name}`);
        ast.children.push({
          type: 'element',
          tagName: 'DemoViewer',
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
