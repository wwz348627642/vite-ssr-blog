import { Article } from '../../generated';
import { makeVar } from '@apollo/client/index.js';
export const setArticleInfo = makeVar<Partial<Article>>({});