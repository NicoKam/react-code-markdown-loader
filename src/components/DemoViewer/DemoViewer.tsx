import React, { useState, CSSProperties, useCallback } from 'react';
import pc from 'prefix-classnames';
import { Collapse, Tooltip, message } from 'antd';
import clipboard from 'clipboard-polyfill';
import CodePreview from '../CodePreview';
import './DemoViewer.less';

const CopyIcon = (props) => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="copy"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
  </svg>
);

const renderElement = (title: any) => {
  if (React.isValidElement(title)) {
    return title;
  }
  if(typeof title === 'object' && title['zh-CN']){
    return title['zh-CN'];
  }
  return String(title);
};

export interface DemoViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /* 描述 */
  meta?: {
    /* 标题 */
    title?: React.ReactElement;
  };
  /* 详情 */
  detail?: React.ReactElement;
  /* 内部div属性 */
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  /*  */
  customPanelStyle?: CSSProperties;
  /* 源码 */
  src?: string;

  /* 代码列表 */
  sources: { type: string; content: string }[];
}

const PREFIX = 'demo-panel';
const px = pc(PREFIX);

const DemoViewer: React.FC<DemoViewerProps> = (props) => {
  const {
    className,
    meta = {},
    detail,
    contentProps,
    customPanelStyle,
    src,
    children,
    sources,
    ...otherProps
  } = props;
  const [collapse, setCollapse] = useState<string[]>([]);
  const { title = '无标题' } = meta;

  const handleClick = useCallback(
    (e) => {
      clipboard.writeText(src);
      e.stopPropagation();
      message.success('已复制');
    },
    [src],
  );
  return (
    <div className={`${PREFIX} ${px({ expand: collapse.length > 0 })} ${className}`} {...otherProps}>
      {title && <div className={px('title')}>{renderElement(title)}</div>}
      {detail && <div className={px('detail')}>{renderElement(detail)}</div>}
      <div className={px('content')} {...contentProps}>
        {children}
      </div>
      <Collapse className={px('collapse')} bordered={false} activeKey={collapse} onChange={setCollapse}>
        <Collapse.Panel
          key={1}
          header={
            <div className={px('source-code-header')}>
              <span>查看源码</span>
              <Tooltip title="复制源码">
                <div onClick={handleClick} style={{ padding: '0 5px', display: 'flex', alignItems: 'center' }}>
                  <CopyIcon />
                </div>
              </Tooltip>
            </div>
          }
          style={customPanelStyle}
        >
          {sources.map(({ type, content }, index) => (
            <React.Fragment key={index}>
              <CodePreview className={px('code-viewer')} language={type}>
                {content}
              </CodePreview>
              <div className={px('hr')}></div>
            </React.Fragment>
          ))}
          <CodePreview className={px('code-viewer')}>{src}</CodePreview>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

DemoViewer.defaultProps = {
  className: '',
  sources: [],
};

export default DemoViewer;
