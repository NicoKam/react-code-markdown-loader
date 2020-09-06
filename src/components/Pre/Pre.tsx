import React, { useRef, useEffect } from 'react';

export interface PreProps extends React.HTMLAttributes<HTMLPreElement> {}

const Pre: React.FC<PreProps> = (props) => {
  // const { children, ...otherProps } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (window.Prism && ref.current && ref.current.children[0]) window.Prism.highlightElement(ref.current.children[0]);
  }, []);
  return <pre ref={ref} {...props}></pre>;
};

Pre.defaultProps = {
};

export default Pre;
