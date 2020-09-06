import markdown from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import remark2rehype from 'remark-rehype';
import slash from 'slash';
import unified from 'unified';
import demoCode from './demoCode';
import demoCompiler from './demoCompiler';
import id from './id';
import link from './link';
import mdCompiler from './mdCompiler';
import meta from './meta';
import scanDemo from './scanDemo';
import DocUtils from './utils/DocUtils';
import raw2html from './raw2html';
import pre from './pre';

function docUtils() {
  this.docUtils = new DocUtils();
  this.docUtils.addImport('react', 'React');
  this.docUtils.addImport('react-router-dom', undefined, ['Link']);
}

function checkIsDemo(sourcePath) {
  const p = slash(sourcePath);
  return p.substr(0, p.lastIndexOf('/')).endsWith('/demo');
}

module.exports = function (content, context) {
  const isDemo = checkIsDemo(this.resourcePath);

  const callback = this.async();

  const { resourcePath } = this;

  const u = unified()
    .use(function () {
      this.resourcePath = resourcePath;
    })
    .use(docUtils)
    .use(markdown)
    .use(frontmatter)
    .use(meta);

  if (isDemo) {
    /* Demo的解析 */

    u.use(demoCode)
      .use(remark2rehype, { allowDangerousHtml: true })
      .use(raw2html)
      .use(pre)
      .use(demoCompiler)
      .process(content, (err, file) => {
        // console.log(String(file));
        callback(err, String(file));
      });
  } else {
    /* 普通文档的解析 */
    u.use(remark2rehype, { allowDangerousHtml: true })
      .use(raw2html)
      .use(pre)
      .use(id)
      .use(link)
      .use(scanDemo(this.resourcePath))
      .use(mdCompiler)
      .process(content, (err, file) => {
        // console.log(String(file));
        callback(err, String(file));
      });
  }

};
