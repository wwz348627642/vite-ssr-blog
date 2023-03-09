import React, { PropsWithChildren, FC } from 'react'
import { ApolloProvider } from '@apollo/client/index.js'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN.js'
import makeApolloClient from './apolloClient';

interface AppProps extends PropsWithChildren {
  client: ReturnType<typeof makeApolloClient>
}

const App: FC<AppProps> = ({ client, children }) => {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider locale={zhCN}>
        {children}
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default App
