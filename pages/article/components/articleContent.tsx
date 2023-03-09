import { Card } from 'antd';
import { FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { setArticleInfo } from '../cache';
import { useReactiveVar } from '@apollo/client/index.js';
import styles from './articleContent.module.less';

const ArticleContent: FC = () => {
  const { content } = useReactiveVar(setArticleInfo);

  return (
    <div>
      <Card bordered={false}>
        <div data-color-mode="light">
          <MDEditor.Markdown
            transformLinkUri={(
              href,
            ) => {
              if (href.indexOf('#') > -1) {
                const pathname = window.location.pathname;
                href = pathname + href;
              }
              return href
            }}
            source={content} 
          />
        </div>
      </Card>
    </div>
  )
}

export default ArticleContent;