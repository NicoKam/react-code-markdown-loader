import fromParse5 from 'hast-util-from-parse5';
import parse5 from 'parse5';
import visit from 'unist-util-visit';
import { isAbsolutePath } from './common';
import ref from './ref';

let index = 1;
function createRandomImgName(src = ''): string {
  return `img_${src.replace(/[^a-zA-Z\d_]/g, '_')}_${index++}`;
}

function changeImgSrc(ast, docUtils) {
  visit(ast, 'element', (node) => {
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
}

export default function () {
  const { docUtils } = this;
  return (ast) => {
    changeImgSrc(ast, docUtils);

    visit(ast, 'raw', (node, i, parent) => {
      try {
        /* 解析html内容 */
        const ast = parse5.parseFragment(String(node.value), { sourceCodeLocationInfo: false });
        const hast = fromParse5(ast);
        changeImgSrc(hast, docUtils);
        node.properties = {};
        node.children = hast.children;
        node.type = 'element';
        node.tagName = 'p';
        node.value = undefined;
      } catch (e) {}
    });
  };
}
