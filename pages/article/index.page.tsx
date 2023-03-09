import { FC, lazy, useEffect, useState } from "react";
import { Layout } from "antd";
import { useQueryArticleItemQuery, QueryArticleItemDocument } from "../../generated";
import styles from './index.module.less';
import Sidebar from "./components/sidebar";
import { setArticleInfo } from "./cache";
import { PageProps } from "../../renderer/types";
import { resolveDocument } from "../../utils/gqlDocument";
import { articleId } from './index.page.route';
import Content from "../../components/Content";

function Loading () {
  return (
    <div></div>
  )
}

interface Props {
  articleId: string;
}


const Page: FC<PageProps<Props>> = ({ routeParams }) => {
  const [Component, setComponent] = useState(() => Loading);
  useQueryArticleItemQuery({
    variables: {
      id: routeParams?.articleId || '',
    },
    onCompleted (data) {
      setArticleInfo(data?.queryArticleItem);
    }
  })
  useEffect(() => {
    // @ts-ignore
    setComponent(() => lazy(() => import('./components/articleContent')));
  }, [])

  return (
    <Content>
      <Layout className={styles.articlePage}>
        <Sidebar />
        <Layout.Content className={styles.articleContent}>
          <div className={styles.padding}>
            <Component />
          </div>
        </Layout.Content>  
      </Layout>
    </Content>
  )
}

const query = resolveDocument([
  {
    documentNode: QueryArticleItemDocument,
    variables: {
      id: articleId
    }
  }
])

export {
  Page,
  query
};