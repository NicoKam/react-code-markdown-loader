export const isSourceCode = (type: string) => {
  return ['js', 'javascript', 'jsx', 'ts', 'typescript', 'tsx'].includes(type);
};

export function isAbsolutePath(path: string = '') {
  if (path.startsWith('http://')) return true;
  if (path.startsWith('https://')) return true;
  if (path.startsWith('/')) return true;
  return false;
}