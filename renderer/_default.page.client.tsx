
import { hydrateRoot } from 'react-dom/client'
import App from './app'
import makeApolloClient from './apolloClient';
import './default.less';
import { PageContextClient } from './types';
import { PageContextProvider } from './useContext';
import { Page as ErrorPage } from './_error.page';

function render(pageContext: PageContextClient) {
  const { Page, ...pageContextOmitPage } = pageContext;
  const { apolloIntialState, is404, SSR, DEV } = pageContextOmitPage;
  const apolloClient = makeApolloClient({
    apolloIntialState,
    ssrMode: SSR,
    dev: DEV
  });
  const root = document.getElementById('root');
  if (root) {

    const renderDom = is404 ? <ErrorPage /> : <Page {...pageContextOmitPage} />

    hydrateRoot(
      root,
      <App client={apolloClient}>
        <PageContextProvider pageContext={pageContextOmitPage}>
          { renderDom }
        </PageContextProvider>
      </App>
    ) 
  }
}

export { render }
