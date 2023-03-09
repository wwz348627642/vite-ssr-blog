import { ArticleListQueryVariables } from '../../generated';
import { makeVar } from '@apollo/client/index.js';

/**
 * 当前跳转前文章所在索引，返回的时候，可快速定位到该文章
 */
type ArticlePageRequest = Pick<ArticleListQueryVariables['listForm'], 'pageNo' | 'pageSize'>;[]

type TagId = ArticleListQueryVariables['listForm']['tagId'];

export const cachePage = makeVar<ArticlePageRequest>({ pageNo: 1, pageSize: 4 });

export const cacheTag = makeVar<TagId>(undefined);