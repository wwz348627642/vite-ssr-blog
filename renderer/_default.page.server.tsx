import React from 'react'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { renderToStringWithData } from '@apollo/client/react/ssr/index.js'
import App from './app'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import './default.less';
import { PageContextServer } from './types';
import { PageContextProvider } from './useContext';
import { gql } from '@apollo/client/index.js';
import { config } from './config.js';
import fetch from 'cross-fetch';

const passToClient = [
  'apolloIntialState', 
  'routeParams',
  'is404',
  'DEV',
  'SSR',
]


async function render(pageContext: PageContextServer) {
  const cache = createCache();
  const { Page, client } = pageContext;
  // See https://www.apollographql.com/docs/react/performance/server-side-rendering/
  const styleText = extractStyle(cache);
  const tree = (
    <App client={client}>
      <PageContextProvider pageContext={pageContext}>
        <StyleProvider cache={cache}>
          <Page />
        </StyleProvider>
      </PageContextProvider>
    </App>
  )

  const pageHtml = await renderToStringWithData(tree);
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>wilsonwang</title>
        <style>${styleText}</style>
        <meta name="keywords" content="前端,nest,React,vite,graphql,webgl,ssr" />
        <meta name="description" content="vite-ssr前端blog" />
        <meta name="author" content="wilsonwang" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
  
  const { DEV, SSR } = import.meta.env;
  return {
    documentHtml,
    pageContext: {
      DEV,
      SSR,
    }
  }
}

async function onBeforeRender(pageContext: PageContextServer) {
  const { client, exports } = pageContext;
  let api: string;
  const { DEV } = import.meta.env;
  if (DEV) {
    api = config.dev.api;
  } else {
    api = config.product.api;
  }

  if (exports.query) {
    const data = await fetch(api, {
      method: 'POST',
      body: JSON.stringify(exports.query),
      headers: {
        'content-type': 'application/json',
      }
    })
    const result = await data.json();
    if (Array.isArray(result)) {
      result.forEach((r, i) => {
        const request = exports.query[i];
        const cacheVariables = request.cacheVariables;
        const variables = cacheVariables ? request.variables : undefined;
        const query = gql(request.query);
        client.cache.writeQuery({
          query: query,
          data: r.data,
          variables: variables,
        })
      })
    }
  }

 
  const apolloIntialState = client.extract();
  return {
    pageContext: {
      apolloIntialState,
    }
  }

}

export { 
  passToClient, 
  render,
  onBeforeRender
}