import visit from 'unist-util-visit';
import YAML from 'yaml';

export default function () {
  return (ast, vFile) => {
    visit(ast, 'yaml', (node, index) => {
      const meta = YAML.parse(String(node.value));
      this.meta = meta;
      ast.children.splice(index, 1);
    });
  };
}
