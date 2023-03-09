import express from 'express';
import { renderPage } from 'vite-plugin-ssr'
import { createServer } from 'vite';
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import makeApolloClient from '../renderer/apolloClient.js';

const isProduction = process.env.NODE_ENV === 'production'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = `${__dirname}/..`;

async function startServer() {
  const base = '/app';
  const app = express();
  if (isProduction) {
    

    app.use(express.static(`${root}/dist/client`))
  } else {
    const viteDevMiddleware = (
      await createServer({
        base,
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }
  
  app.get('*', async (req, res, next) => {
    // It's important to create an entirely new instance of Apollo Client for each request.
    // Otherwise, our response to a request might include sensitive cached query results
    // from a previous request. Source: https://www.apollographql.com/docs/react/performance/server-side-rendering/#example
   
    const apolloClient = makeApolloClient({
      ssrMode: true
    });

    const pageContextInit = {
      urlOriginal: req.originalUrl,
      client: apolloClient,
      dev: !isProduction
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = 4000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}${base}`)
}

startServer()