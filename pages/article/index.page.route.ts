

import { resolveRoute } from 'vite-plugin-ssr/routing';
import { PageContext } from '../../renderer/types';

let articleId: string;

export default (pageContent: PageContext) => {
  const { urlPathname } = pageContent;
  if (urlPathname) {
    const result = resolveRoute('/article/@articleId', urlPathname);
    articleId = result.routeParams.articleId;
    return result
  }
}

export {
  articleId
}
