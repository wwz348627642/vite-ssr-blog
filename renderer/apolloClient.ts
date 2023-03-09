import { ApolloClient, InMemoryCache, ApolloLink, from, NormalizedCacheObject } from "@apollo/client/index.js";
import { BatchHttpLink } from "@apollo/client/link/batch-http/index.js";
import { RetryLink } from "@apollo/client/link/retry/index.js";
import { onError } from "@apollo/client/link/error/index.js";
import { config } from './config.js';
import fetch from 'cross-fetch';

interface MakeApolloClientArgs {
  apolloIntialState?: NormalizedCacheObject;
  ssrMode?: boolean;
  dev?: boolean;
}

const makeApolloClient = (makeApolloClientArgs: MakeApolloClientArgs) => {
  const { apolloIntialState, ssrMode, dev } = makeApolloClientArgs
  let uri: string;
  if (dev) {
    uri = config.dev.api;
  } else {
    uri = config.product.api;
  }
  // 合并请求
  const link = new BatchHttpLink({
    uri,
    batchMax: 5,
    batchInterval: 20,
    includeExtensions: true,
    fetch: fetch,
  })
  const INVALID_TOKEN = 'Response not successful: Received status code 401';
  // 网络错误重试请求
  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => {
        if (error &&  error.message != INVALID_TOKEN) {
          return !!error
        }
        return false;
      }
    }
  });
  // 请求拦截器
  const beforeRequest = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
      },
      http: {
        includeExtensions: true,
        includeQuery: true,
      }
    }));
    return forward(operation)
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articleList: {
            keyArgs: false,
          }
        }
      }
    }
  })
  
  if (apolloIntialState) {
    cache.restore(apolloIntialState);
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        const  {message, locations, path, extensions } = err;
        const response: any = extensions?.response;
        const statusCode: number = response?.statusCode;
        switch (statusCode) {
          case 403:
            // Message.error('请先登录');
            return;
        }
        // const msgError =  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
        // Message.error(message);
      }
    }
    if (networkError) {
      if (INVALID_TOKEN == networkError.message) {
        // Message.error('请重新登录');
        console.log('请重新登录')
        return;
      }

      // Message.error(networkError.message);
    }
  
  });

  return new ApolloClient({
    name: 'app',
    version: '0.0.1',
    uri,
    cache,
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: { 
        fetchPolicy: 'cache-first',
      },
    },
    ssrMode,
    link: from([
      beforeRequest,
      retryLink,
      errorLink,
      link,
    ]),
  })
}

export default makeApolloClient;