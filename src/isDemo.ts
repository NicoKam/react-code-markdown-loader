import slash from 'slash';

export default (sourcePath) =>
  function () {
    return async (ast) => {
      const p = slash(sourcePath);
      this.isDemo = p.substr(0, p.lastIndexOf('/')).endsWith('/demo');
    };
  };
