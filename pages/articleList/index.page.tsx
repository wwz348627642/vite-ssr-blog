import { FC, useRef, useEffect } from "react";
import { Article, Tag as ITag, useArticleListLazyQuery, TagListDocument, useTagListQuery, ArticleListDocument, useArticleListQuery, ArticleListQueryVariables } from '../../generated';
import { Row, Spin, Tag } from "antd";
import { useReactiveVar } from "@apollo/client/index.js";
import { cachePage, cacheTag } from "./cache";
import ArticleItem from "./components/articleItem";
import styles from './index.module.less';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import { resolveDocument } from "../../utils/gqlDocument";
import Content from '../../components/Content';

const Page: FC = () => {

  const page = useReactiveVar(cachePage);
  const tagId = useReactiveVar(cacheTag);

  const { data: tagData } = useTagListQuery();
  const { data, loading, variables, fetchMore } = useArticleListQuery({
    variables: {
      listForm: { pageNo: page.pageNo, pageSize: page.pageSize, tagId: tagId }
    },
    onCompleted (result) {
      cachePage({
        pageNo: result.articleList.pageNo,
        pageSize: result.articleList.pageSize,
      })
    }
  })

  const fetchList = (variables: ArticleListQueryVariables) => {
    fetchMore({
      variables,
    })
  }


  const onChangeCheckableTag = (checked: boolean, tag: Partial<ITag>) => {
    const selectData = checked ? tag : null;
    cacheTag(selectData?.id);
    fetchList({
      listForm: { pageNo: 1, pageSize: 4, tagId: selectData?.id }
    })
  }

  const totalPage = Math.ceil(Number(data?.articleList.total) / Number(data?.articleList.pageSize));

  return (
    <Content>
      <Row justify="center" gutter={24} className={styles.tag}>
        {
          tagData?.tagList.map(tag => {
            const checked = tag.id == tagId;
            return (
              <Tag.CheckableTag
                key={tag.id}
                checked={checked}
                onChange={checked => onChangeCheckableTag(checked, tag)}
              >{ tag.name }</Tag.CheckableTag>
            ) 
          })
        }
      </Row>
      <Spin spinning={loading}>
        <div>
        {
          data?.articleList.content.map((article, index) => {
            return (
              <div key={index}>
                <ArticleItem data={article as Article} />
              </div>
            )
          })
        }

          <Row align='middle' justify='center' className={styles.pagination}>
            {
              Number(data?.articleList.pageNo) == 1 ? null : (
                <div 
                  className={styles.leftArrow}
                  onClick={() => fetchList({ 
                    listForm: {
                      pageNo: Number(variables?.listForm.pageNo) - 1, 
                      pageSize: Number(variables?.listForm.pageSize), 
                      tagId: variables?.listForm.tagId,
                    }
                  })}
                >
                  <LeftCircleOutlined style={{ fontSize: 28 }} />
                </div>
              )
            }
            <Row justify='center'>
              <div>第{page.pageNo}页</div>
              &nbsp;&nbsp;
              <div>共{totalPage || 0}页</div>
            </Row>
            {
              totalPage === Number(data?.articleList.pageNo) ? null : (
                <div 
                  className={styles.rightArrow}
                  onClick={() => fetchList({ 
                    listForm: {
                      pageNo: Number(variables?.listForm.pageNo) + 1, 
                      pageSize: Number(variables?.listForm.pageSize), 
                      tagId: variables?.listForm.tagId,
                    }  
                  })}
                >
                  <RightCircleOutlined style={{ fontSize: 28 }} />
                </div>
              )
            }
          </Row>
        </div>
      </Spin>
      <Footer />
    </Content>
  )
}

const query = resolveDocument([
  {
    documentNode: TagListDocument,
    cacheVariables: false
  },
  {
    documentNode: ArticleListDocument,
    variables: {
      listForm: {
        pageNo: 1,
        pageSize: 4,
      }
    },
    cacheVariables: false,
  }
])

export { Page, query };