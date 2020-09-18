import fromParse5 from 'hast-util-from-parse5';
import parse5 from 'parse5';
import visit from 'unist-util-visit';
import ref from './ref';

function createRandomImgName(src = ''): string {
  return `img_${src.replace(/[^a-zA-Z\d_]/g, '_')}`;
}

function isAbsolutePath(path: string = '') {
  if (path.startsWith('http://')) return true;
  if (path.startsWith('https://')) return true;
  if (path.startsWith('/')) return true;
  return false;
}

export default function () {
  const { docUtils } = this;
  return (ast) => {
    visit(ast, 'raw', (node, i, parent) => {
      try {
        /* 解析html内容 */
        const ast = parse5.parseFragment(String(node.value), { sourceCodeLocationInfo: false });
        const hast = fromParse5(ast);

        visit(hast, 'element', (node) => {
          /* 查找到img */
          if (node.tagName === 'img') {
            const { src } = node.properties || {};
            if (src && !isAbsolutePath(src)) {
              const name = createRandomImgName(src);
              docUtils.addImport(src, name);
              node.properties.src = ref(name);
            }
          }
        });
        node.properties = {};
        node.children = hast.children;
      } catch (e) {
        node.properties = {
          dangerouslySetInnerHTML: ref(`{__html:${JSON.stringify(node.value)}}`),
        };
        node.children = [];
      }

      node.type = 'element';
      node.tagName = 'span';
      node.value = undefined;
    });
  };
}
