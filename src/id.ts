import visit from 'unist-util-visit';
import toString from 'hast-util-to-string';
import DocUtils from './utils/DocUtils';

function id() {
  const idList = [];
  this.idList = idList;
  const docUtils: DocUtils = this.docUtils;

  function pushId(id, type) {
    let insertId = id;
    while (idList.includes(id)) {
      if (/_\d+$/.test(insertId)) {
        insertId.replace(/_(\d+)$/, (str, m1) => `_${Number(m1) + 1}`);
      } else {
        insertId += '_1';
      }
    }
    insertId = escape(insertId);
    idList.push([id, type, insertId]);
    return insertId;
  }

  return (ast) => {
    /* add meta title */
    const { meta = {} } = this;
    let title = '';
    if (typeof meta.title === 'string') title = meta.title;
    if (meta.title && typeof meta.title['zh-CN'] === 'string') title = meta.title['zh-CN'];

    if (title) {
      ast.children.unshift({
        type: 'element',
        tagName: 'h1',
        properties: {},
        children: [
          {
            type: 'text',
            value: title,
          },
        ],
      });
    }

    visit(ast, 'element', (node, i, parent) => {
      if (['h1', 'h2', 'h3', 'h4', 'h6'].includes(node.tagName)) {
        const id = toString(node);
        node.properties.id = pushId(id, node.tagName);
      }
    });
    docUtils.pushCode(`export const idList = ${JSON.stringify(idList)};`);
  };
}
export default id;
