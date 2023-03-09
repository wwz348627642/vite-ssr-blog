
import { FC, useRef, useLayoutEffect, useEffect } from 'react';
import { Render } from './libs';

let app: Render;

const ClientPage: FC = () => {
  const ref = useRef<HTMLDivElement>(null);


  const clickBox = (index: number) => {
    const navMap: { [key: number]: Function } = {
      0: () => window.location.href  = '/app/articleList',
      1: () => window.location.href = '/app/imageRoom',
    }
    navMap[index]?.();
  }
 
  useLayoutEffect(() => {
    // cacheShowHeader(false);
    if (ref.current) {
      if (!app) {
        app = new Render(ref.current, { onClick: clickBox });
      }
      app.render();
    }
  }, [])

  useEffect(() => {
    return () => {
      // cacheShowHeader(true);
      app.clear();
      // @ts-ignore
      app = null;
    }
  }, [])

  return (
    <div ref={ref}></div>
  )
}


export default ClientPage;
