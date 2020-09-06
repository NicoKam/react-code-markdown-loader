import React, { useRef, useEffect } from 'react';

function encodeHtml(str: string = '') {
  let s = '';
  if (str.length === 0) return '';
  s = str.replace(/&/g, '&amp;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  // s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/'/g, '&#39;');
  s = s.replace(/"/g, '&quot;');
  // s = s.replace(/\n/g, "<br/>");
  return s;
}
export interface CodePreviewProps extends React.HTMLAttributes<HTMLPreElement> {
  children: string;
}

const CodePreview: React.FC<CodePreviewProps> = (props) => {
  const { children, style, ...otherProps } = props;
  const divRef = useRef();
  useEffect(() => {
    if (window.Prism) window.Prism.highlightElement(divRef.current);
  }, [children]);
  return (
    <pre
      style={{
        fontSize: 12,
        ...style,
      }}
      {...otherProps}
    >
      <code className="language-jsx" ref={divRef} dangerouslySetInnerHTML={{ __html: encodeHtml(children || '') }} />
    </pre>
  );
};

CodePreview.defaultProps = {
  className: '',
};

export default CodePreview;
