import React, { useContext, FC, PropsWithChildren } from 'react'
import { PageContextClient } from './types'

type ContextProvidder = Partial<Omit<PageContextClient, 'Page'>>;

const Context = React.createContext<ContextProvidder>({})

interface PageContextProviderProps {
  pageContext: ContextProvidder;
}

export const PageContextProvider: FC<PropsWithChildren<PageContextProviderProps>> = ({ pageContext, children }) => {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

type Key = keyof ContextProvidder;

export function usePageContext(key?: Key) {
  const pageContext = useContext(Context);
  
  if (key) {
    return pageContext[key];
  }

  return pageContext
}