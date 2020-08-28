export type ImportStatement = {
  defaultSpecifier?: string;

  namespaceSpecifier?: aliasName[];

  sourcePath: string;
};

export type aliasName = string | [string, string];

const aliasNameToString = (name: aliasName): string => {
  if (typeof name === 'string') {
    return name;
  } else {
    return name[0] + ' as ' + name[1];
  }
};

const importStatementToString = (importStatement: ImportStatement): string => {
  const { sourcePath, defaultSpecifier, namespaceSpecifier = [] } = importStatement;
  const specifier: string[] = [];
  if (defaultSpecifier) specifier.push(defaultSpecifier);
  if (namespaceSpecifier.length > 0) specifier.push(`{ ${namespaceSpecifier.map(aliasNameToString)} }`);
  return `import ${specifier.join(', ')} from '${sourcePath}';`;
};

const exportStatementToString = (exportStatement: aliasName[] = []) => {
  if (exportStatement.length > 0) {
    return `export { ${exportStatement.map(aliasNameToString)} };`;
  }
  return '';
};

class DocUtils {
  importStatement: ImportStatement[] = [];

  exportDefaultStatement: string;

  exportStatement: aliasName[] = [];

  code: string[] = [];

  addImport = (sourcePath: string, defaultSpecifier?: string, namespaceSpecifier?: aliasName[]) => {
    let importExists = this.importStatement.find(({ sourcePath: sp }) => sp === sourcePath);
    if (importExists != null) {
      if (!importExists.defaultSpecifier) {
        importExists.defaultSpecifier = defaultSpecifier;
      } else {
        if (importExists.defaultSpecifier !== defaultSpecifier) {
          this.importStatement.push({
            defaultSpecifier,
            sourcePath,
          });
        }
      }

      if (importExists.namespaceSpecifier) {
        importExists.namespaceSpecifier = [...new Set([...importExists.namespaceSpecifier, ...namespaceSpecifier])];
      }
    } else {
      this.importStatement.push({
        defaultSpecifier,
        sourcePath,
        namespaceSpecifier,
      });
    }
  };

  addExport = (exportStatement: aliasName[]) => {
    this.exportStatement.push(...exportStatement);
  };

  exportDefault = (exportStatement: string) => {
    this.exportDefaultStatement = exportStatement;
  };

  pushCode = (code: string) => {
    this.code.push(code);
  };

  toString = () => {
    return `${this.importStatement.map(importStatementToString).join('\n')}
${this.code.join('\n')}
${exportStatementToString(this.exportStatement)}
${this.exportDefaultStatement ? `export default ${this.exportDefaultStatement};` : ''}
    `;
  };
}

export default DocUtils;
