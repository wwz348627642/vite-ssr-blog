import { PageContextBuiltInClient, PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/index.js'
import { ResolveDocumentResult  } from '../utils/gqlDocument';

type ConfigEnv = {
  api: string;
}

export type Config = {
  dev: ConfigEnv;
  product: ConfigEnv;
}

export type Page = (pageProps: PageProps) => React.ReactElement

export type PageProps<T = any> = {
  routeParams?: T;
}

type PageContextCustom = {
  Page: Page
  pageProps?: PageProps;
  apolloIntialState: NormalizedCacheObject;
  client: ApolloClient<NormalizedCacheObject>;
  DEV: boolean;
  SSR: boolean;
  exports: {
    query: Array<ResolveDocumentResult>
  }
}

export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
export type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

export type PageContext = PageContextClient | PageContextServer