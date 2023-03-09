import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
// https://vitejs.dev/config/
const config: UserConfig = {
  publicDir: "./public",
  build: {
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // https://ant.design/docs/react/customize-theme-cn
        modifyVars: {
          '@heading-color': '#333333',
          '@layout-header-background': '#ffffff',
          '@layout-header-padding': '0px',
          '@border-color-base': '#e6eaea',
          '@primary-color': '#1890ff',
        }
      } 
    }
  },
  server: {
    open: 'http://localhost:4000/app',
    port: 4000,
  },
  plugins: [ 
    react(),
    ssr({
      baseServer: '/app'
    }),
  ],
  // optimizeDeps: { 
  //   include: ['cross-fetch', 'react/jsx-runtime'] 
  // }
}
export default config