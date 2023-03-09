import { gql } from '@apollo/client/index.js';
import * as Apollo from '@apollo/client/index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectId: any;
};

export type AddFriendLinkForm = {
  /** 友情链接url */
  link?: InputMaybe<Scalars['String']>;
  /** 友情链接名称 */
  name: Scalars['String'];
};

export type Article = {
  __typename?: 'Article';
  /** 内容 */
  content: Scalars['String'];
  /** 首次发布时间 */
  createTime?: Maybe<Scalars['DateTime']>;
  /** 描述 */
  description: Scalars['String'];
  id: Scalars['ObjectId'];
  /** 当前文章状态 */
  status: ArticleEnum;
  statusText: Scalars['String'];
  tagList: Array<Tag>;
  /** 标题 */
  title: Scalars['String'];
  /** 更新时间 */
  updateTime?: Maybe<Scalars['DateTime']>;
  viewCount: Scalars['Int'];
};

/** SUCCESS: 已发布, DOWN: 已下线, PENDING: 存草稿 */
export enum ArticleEnum {
  /** 已下线 */
  Down = 'DOWN',
  /** 存草稿 */
  Pending = 'PENDING',
  /** 已发布 */
  Success = 'SUCCESS',
  GetText = 'getText'
}

export type ArticleList = {
  __typename?: 'ArticleList';
  content: Array<Article>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  /** 文章总数 */
  total: Scalars['Int'];
};

/** ARTICLE: 文章, TAG: 标签 */
export enum BiTypeEnum {
  /** 文章 */
  Article = 'ARTICLE',
  /** 标签 */
  Tag = 'TAG',
  GetText = 'getText'
}

export type Comment = {
  __typename?: 'Comment';
  articleId: Scalars['String'];
  content: Scalars['String'];
  createTime: Scalars['DateTime'];
  id: Scalars['ObjectId'];
  pid?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type CreateCommentForm = {
  articleId: Scalars['String'];
  content: Scalars['String'];
  replyId?: InputMaybe<Scalars['String']>;
};

export type CreateForm = {
  /** 文章内容 */
  content: Scalars['String'];
  /** 文章描述 */
  description: Scalars['String'];
  /** 文章跟新状态 */
  status?: InputMaybe<ArticleEnum>;
  /** 标签id */
  tagList?: InputMaybe<Array<Scalars['String']>>;
  /** 文章标题 */
  title: Scalars['String'];
};

export type CreateTagForm = {
  /** 标签颜色 */
  color: Scalars['String'];
  /** 标签名称 */
  name: Scalars['String'];
};

export type FriendLink = {
  __typename?: 'FriendLink';
  createTime: Scalars['DateTime'];
  id: Scalars['ObjectId'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updateTime?: Maybe<Scalars['DateTime']>;
};

export type Image = {
  __typename?: 'Image';
  createTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  url: Scalars['String'];
};

export type ListForm = {
  pageNo?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  /** 文章跟新状态 */
  status?: InputMaybe<ArticleEnum>;
  /** 文章标签, 支持,分割 */
  tagId?: InputMaybe<Scalars['String']>;
};

export type LoginForm = {
  /** 登录用户 */
  name: Scalars['String'];
  /** 密码 */
  password: Scalars['String'];
};

export type MediaCreateForm = {
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 链接地址 */
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 新增评论 */
  addComment: Comment;
  /** 添加友情链接 */
  addFriendLink: FriendLink;
  /** 添加图片 */
  addImage: Image;
  /** 新增文章 */
  createArticle: Article;
  /** 添加标签 */
  createTag: Tag;
  /** 删除标签 */
  deleteArticleById: Scalars['Boolean'];
  /** 删除评论 */
  deleteComment: Scalars['Boolean'];
  /** 删除友情链接 */
  deleteFriendLink: Scalars['Boolean'];
  /** 删除图片 */
  deleteMediaById: Scalars['Boolean'];
  /** 登录 */
  login: Scalars['String'];
  /** 修改文章 */
  modifyArticleById: Article;
  /** 注册 */
  register: Scalars['Boolean'];
  setSetting: Scalars['String'];
  /** 修改评论 */
  updateComment: Comment;
  /** 更新友情链接 */
  updateFriendLink: FriendLink;
  /** 更新用户信息 */
  updateUser: User;
};


export type MutationAddCommentArgs = {
  createCommentForm: CreateCommentForm;
};


export type MutationAddFriendLinkArgs = {
  addForm: AddFriendLinkForm;
};


export type MutationAddImageArgs = {
  mediaCreateForm: MediaCreateForm;
};


export type MutationCreateArticleArgs = {
  createForm: CreateForm;
};


export type MutationCreateTagArgs = {
  createForm: CreateTagForm;
};


export type MutationDeleteArticleByIdArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteFriendLinkArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMediaByIdArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  loginForm: LoginForm;
};


export type MutationModifyArticleByIdArgs = {
  updateForm: UpdateForm;
};


export type MutationRegisterArgs = {
  registerForm: RegisterForm;
};


export type MutationSetSettingArgs = {
  settingForm: SettingForm;
};


export type MutationUpdateCommentArgs = {
  updateCommentForm: UpdateCommentForm;
};


export type MutationUpdateFriendLinkArgs = {
  updateForm: UpdateFriendLinkForm;
};


export type MutationUpdateUserArgs = {
  updateUserForm: UpdateUserForm;
};

export type Pv = {
  __typename?: 'Pv';
  article: Article;
  count: Scalars['Int'];
};

export type PvForm = {
  /** 结束时间 */
  endDate: Scalars['String'];
  /** 开始时间 */
  startDate: Scalars['String'];
  type: BiTypeEnum;
};

export type Query = {
  __typename?: 'Query';
  /** 获取文章列表 */
  articleList: ArticleList;
  /** 获取评论列表 */
  commentList: Array<Comment>;
  /** 根据token查询用户 */
  findUserByToken: User;
  /** 获取图片列表 */
  getImageList: Array<Image>;
  /** 获取上传凭证 */
  getUploadToken: Scalars['String'];
  /** 按时间统计pv */
  pvBi: Array<Pv>;
  /** 获取单个文章 */
  queryArticleItem: Article;
  /** 查询友情链接 */
  queryFriendLink: Array<FriendLink>;
  /** 查询当前管理员设置 */
  querySetting: Setting;
  /** 获取标签列表 */
  tagList: Array<Tag>;
  /** 按时间统计uv */
  uvBi: Array<Uv>;
};


export type QueryArticleListArgs = {
  listForm: ListForm;
};


export type QueryCommentListArgs = {
  articleId: Scalars['String'];
};


export type QueryPvBiArgs = {
  pvForm: PvForm;
};


export type QueryQueryArticleItemArgs = {
  id: Scalars['String'];
};


export type QueryUvBiArgs = {
  uvForm: UvForm;
};

export type RegisterForm = {
  /** 登录用户 */
  name: Scalars['String'];
  /** 昵称 */
  nickName: Scalars['String'];
  /** 密码 */
  password: Scalars['String'];
};

export enum RoleEnum {
  /** 管理员 */
  Admin = 'ADMIN',
  /** 游客 */
  Customer = 'CUSTOMER',
  /** 访客 */
  Visitor = 'VISITOR'
}

export type Setting = {
  __typename?: 'Setting';
  id?: Maybe<Scalars['ObjectId']>;
  /** 所使用的live2d模型名称 */
  live2dName?: Maybe<Scalars['String']>;
  /** 是否开启live2d */
  openLive2d?: Maybe<Scalars['Boolean']>;
};

export type SettingForm = {
  id?: InputMaybe<Scalars['String']>;
  /** live2d模型名称 */
  live2dName?: InputMaybe<Scalars['String']>;
  /** 是否开启live2d */
  openLive2d: Scalars['Boolean'];
};

export type Tag = {
  __typename?: 'Tag';
  /** 颜色 */
  color: Scalars['String'];
  id: Scalars['ObjectId'];
  /** 名称 */
  name: Scalars['String'];
};

export type UpdateCommentForm = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type UpdateForm = {
  /** 文章内容 */
  content?: InputMaybe<Scalars['String']>;
  /** 文章描述 */
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  /** 文章跟新状态 */
  status?: InputMaybe<ArticleEnum>;
  /** 标签id */
  tagList?: InputMaybe<Array<Scalars['String']>>;
  /** 文章标题 */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateFriendLinkForm = {
  id: Scalars['String'];
  /** 友情链接url */
  link?: InputMaybe<Scalars['String']>;
  /** 友情链接名称 */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserForm = {
  /** 昵称 */
  nickName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** 创建时间 */
  createTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ObjectId'];
  /** 上次登录时间 */
  lastLoginTime?: Maybe<Scalars['DateTime']>;
  /** 账号 */
  name: Scalars['String'];
  /** 昵称 */
  nickName: Scalars['String'];
  /** 当前文章状态 */
  role: RoleEnum;
};

export type Uv = {
  __typename?: 'Uv';
  count: Scalars['Int'];
  date: Scalars['String'];
};

export type UvForm = {
  /** 结束时间 */
  endDate: Scalars['String'];
  /** 开始时间 */
  startDate: Scalars['String'];
};

export type QuerySettingQueryVariables = Exact<{ [key: string]: never; }>;


export type QuerySettingQuery = { __typename?: 'Query', querySetting: { __typename?: 'Setting', openLive2d?: boolean | null, live2dName?: string | null } };

export type QueryArticleItemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type QueryArticleItemQuery = { __typename?: 'Query', queryArticleItem: { __typename?: 'Article', id: any, title: string, content: string } };

export type CommentListQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type CommentListQuery = { __typename?: 'Query', commentList: Array<{ __typename?: 'Comment', id: any, pid?: string | null, content: string, createTime: any, user: { __typename?: 'User', id: any, nickName: string } }> };

export type AddCommentMutationVariables = Exact<{
  createCommentForm: CreateCommentForm;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'Comment', createTime: any, id: any, user: { __typename?: 'User', id: any, nickName: string } } };

export type ArticleListQueryVariables = Exact<{
  listForm: ListForm;
}>;


export type ArticleListQuery = { __typename?: 'Query', articleList: { __typename?: 'ArticleList', pageNo: number, pageSize: number, total: number, content: Array<{ __typename?: 'Article', title: string, description: string, id: any, createTime?: any | null, tagList: Array<{ __typename?: 'Tag', name: string, color: string, id: any }> }> } };

export type TagListQueryVariables = Exact<{ [key: string]: never; }>;


export type TagListQuery = { __typename?: 'Query', tagList: Array<{ __typename?: 'Tag', id: any, name: string }> };

export type GetImageListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetImageListQuery = { __typename?: 'Query', getImageList: Array<{ __typename?: 'Image', id: any, url: string }> };


export const QuerySettingDocument = gql`
    query querySetting {
  querySetting {
    openLive2d
    live2dName
  }
}
    `;

/**
 * __useQuerySettingQuery__
 *
 * To run a query within a React component, call `useQuerySettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuerySettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuerySettingQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuerySettingQuery(baseOptions?: Apollo.QueryHookOptions<QuerySettingQuery, QuerySettingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuerySettingQuery, QuerySettingQueryVariables>(QuerySettingDocument, options);
      }
export function useQuerySettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuerySettingQuery, QuerySettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuerySettingQuery, QuerySettingQueryVariables>(QuerySettingDocument, options);
        }
export type QuerySettingQueryHookResult = ReturnType<typeof useQuerySettingQuery>;
export type QuerySettingLazyQueryHookResult = ReturnType<typeof useQuerySettingLazyQuery>;
export type QuerySettingQueryResult = Apollo.QueryResult<QuerySettingQuery, QuerySettingQueryVariables>;
export const QueryArticleItemDocument = gql`
    query queryArticleItem($id: String!) {
  queryArticleItem(id: $id) {
    id
    title
    content
  }
}
    `;

/**
 * __useQueryArticleItemQuery__
 *
 * To run a query within a React component, call `useQueryArticleItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryArticleItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryArticleItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQueryArticleItemQuery(baseOptions: Apollo.QueryHookOptions<QueryArticleItemQuery, QueryArticleItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryArticleItemQuery, QueryArticleItemQueryVariables>(QueryArticleItemDocument, options);
      }
export function useQueryArticleItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryArticleItemQuery, QueryArticleItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryArticleItemQuery, QueryArticleItemQueryVariables>(QueryArticleItemDocument, options);
        }
export type QueryArticleItemQueryHookResult = ReturnType<typeof useQueryArticleItemQuery>;
export type QueryArticleItemLazyQueryHookResult = ReturnType<typeof useQueryArticleItemLazyQuery>;
export type QueryArticleItemQueryResult = Apollo.QueryResult<QueryArticleItemQuery, QueryArticleItemQueryVariables>;
export const CommentListDocument = gql`
    query commentList($articleId: String!) {
  commentList(articleId: $articleId) {
    id
    pid
    user {
      id
      nickName
    }
    content
    createTime
  }
}
    `;

/**
 * __useCommentListQuery__
 *
 * To run a query within a React component, call `useCommentListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentListQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCommentListQuery(baseOptions: Apollo.QueryHookOptions<CommentListQuery, CommentListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentListQuery, CommentListQueryVariables>(CommentListDocument, options);
      }
export function useCommentListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentListQuery, CommentListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentListQuery, CommentListQueryVariables>(CommentListDocument, options);
        }
export type CommentListQueryHookResult = ReturnType<typeof useCommentListQuery>;
export type CommentListLazyQueryHookResult = ReturnType<typeof useCommentListLazyQuery>;
export type CommentListQueryResult = Apollo.QueryResult<CommentListQuery, CommentListQueryVariables>;
export const AddCommentDocument = gql`
    mutation addComment($createCommentForm: CreateCommentForm!) {
  addComment(createCommentForm: $createCommentForm) {
    createTime
    id
    user {
      id
      nickName
    }
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      createCommentForm: // value for 'createCommentForm'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const ArticleListDocument = gql`
    query articleList($listForm: ListForm!) {
  articleList(listForm: $listForm) {
    pageNo
    pageSize
    total
    content {
      title
      description
      id
      createTime
      tagList {
        name
        color
        id
      }
    }
  }
}
    `;

/**
 * __useArticleListQuery__
 *
 * To run a query within a React component, call `useArticleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleListQuery({
 *   variables: {
 *      listForm: // value for 'listForm'
 *   },
 * });
 */
export function useArticleListQuery(baseOptions: Apollo.QueryHookOptions<ArticleListQuery, ArticleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleListQuery, ArticleListQueryVariables>(ArticleListDocument, options);
      }
export function useArticleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleListQuery, ArticleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleListQuery, ArticleListQueryVariables>(ArticleListDocument, options);
        }
export type ArticleListQueryHookResult = ReturnType<typeof useArticleListQuery>;
export type ArticleListLazyQueryHookResult = ReturnType<typeof useArticleListLazyQuery>;
export type ArticleListQueryResult = Apollo.QueryResult<ArticleListQuery, ArticleListQueryVariables>;
export const TagListDocument = gql`
    query tagList {
  tagList {
    id
    name
  }
}
    `;

/**
 * __useTagListQuery__
 *
 * To run a query within a React component, call `useTagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagListQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagListQuery(baseOptions?: Apollo.QueryHookOptions<TagListQuery, TagListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagListQuery, TagListQueryVariables>(TagListDocument, options);
      }
export function useTagListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagListQuery, TagListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagListQuery, TagListQueryVariables>(TagListDocument, options);
        }
export type TagListQueryHookResult = ReturnType<typeof useTagListQuery>;
export type TagListLazyQueryHookResult = ReturnType<typeof useTagListLazyQuery>;
export type TagListQueryResult = Apollo.QueryResult<TagListQuery, TagListQueryVariables>;
export const GetImageListDocument = gql`
    query getImageList {
  getImageList {
    id
    url
  }
}
    `;

/**
 * __useGetImageListQuery__
 *
 * To run a query within a React component, call `useGetImageListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImageListQuery(baseOptions?: Apollo.QueryHookOptions<GetImageListQuery, GetImageListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImageListQuery, GetImageListQueryVariables>(GetImageListDocument, options);
      }
export function useGetImageListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImageListQuery, GetImageListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImageListQuery, GetImageListQueryVariables>(GetImageListDocument, options);
        }
export type GetImageListQueryHookResult = ReturnType<typeof useGetImageListQuery>;
export type GetImageListLazyQueryHookResult = ReturnType<typeof useGetImageListLazyQuery>;
export type GetImageListQueryResult = Apollo.QueryResult<GetImageListQuery, GetImageListQueryVariables>;