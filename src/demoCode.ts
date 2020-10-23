import { resolve, dirname } from 'path';
import visit from 'unist-util-visit';
import { readFile as _readFile } from 'fs';
import { promisify } from 'util';
import { isSourceCode } from './common';

const readFile = promisify(_readFile);

export default function () {
  this.demoCode = [];
  return (ast): Promise<void> => {
    const removeIndex = [];
    /* 解析嵌入的代码 */
    visit(ast, 'code', (node, index) => {
      if (isSourceCode(String(node.lang))) {
        this.demoCode.push({ content: node.value, type: node.lang });
      } else {
        this.demoCode.push({ content: node.value, type: node.lang });
      }
      removeIndex.push(index);
    });



    const allPromise = [];
    /* 解析code语法 */
    visit(ast, 'html', (node, index) => {
      allPromise.push(
        new Promise((done) => {
          const { value = '' } = node;
          const reg = /<code\s+src=('|")(.+)\1.*(?:\/>|>\s*<\/code>)/;
          if (typeof value === 'string') {
            const matched = value.match(reg);
            if (matched && matched[2]) {
              /* 匹配到<code>语法，移除本条内容 */
              removeIndex.push(index);
              /* 获取文件内容 */
              const srcPath = resolve(dirname(this.resourcePath), matched[2]);
              readFile(srcPath)
                .then((content) => {
                  this.demoCode.push({ content: content.toString(), type: 'js' });
                  done();
                })
                .catch(() => {
                  done();
                });
            }
          } else {
            done();
          }
        }),
      );
    });
    removeIndex.sort().reverse().forEach((index) => {
      ast.children.splice(index, 1);
    });
    return Promise.all(allPromise).then(() => {});
  };
}
