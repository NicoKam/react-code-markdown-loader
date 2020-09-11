export const isSourceCode = (type: string) => {
  return ['js', 'javascript', 'jsx', 'ts', 'typescript', 'tsx'].includes(type);
};
