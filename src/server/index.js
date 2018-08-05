import restify from "restify"
import cookies from "restify-cookies"
import render from "./render"
import debug from "debug"
import routes from "./routes"
// import fs from "fs"
// import path from "path"
// import { renderVue } from "../../dist/server.bundle.js"
// import { createRenderer } from "vue-server-renderer"
// import prerenderNode from "prerender-node"

// create SSR
// const renderer = createRenderer({
//   template: fs.readFileSync("internals/index.html", "utf-8")
// })

// handlers
import handlerSeal from "./handlers/seal"

// middlewares
import authMiddleware from "./middlewares/authMiddleware"

const { NODE_ENV } = process.env

// load .env configuration
if (NODE_ENV == "development") {
  require("dotenv").config()
}

const debugServer = debug("app:server")

const server = restify.createServer()
const port = process.env.PORT || 19090

// global handler initial
// server.use(prerenderNode)
server.use(cookies.parse)
server.use(restify.plugins.gzipResponse())
server.use(
  restify.plugins.bodyParser({
    mapParams: false,
    mapFiles: false,
    maxFieldsSize: 2 * 1024 * 1024
  })
)

// routes
routes(server)

if (NODE_ENV == "development") {
  server.get("/api/generate-seal", handlerSeal)
}

// render vuejs
server.get(/\/super\/*/, authMiddleware, render)

// serve static file from public directory
server.get(
  /\/?.*\//,
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../public`,
    maxAge: 0
  })
)

// render vuejs
server.on("NotFound", render)
// server.on("NotFound", (req, res) => {
//   renderVue({ url: req.url }).then(app => {
//     //context to use as data source
//     //in the template for interpolation
//     const context = {
//       title: "Vue JS - Server Render",
//       meta: `
//         <meta description="vuejs server side render">
//       `
//     }

//     renderer.renderToString(
//       app,
//       context,
//       function(err, html) {
//         if (err) {
//           if (err.code === 404) {
//             res.status(404).end("Page not found")
//           } else {
//             res.status(500).end("Internal Server Error")
//           }
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/html"
//           })
//           res.write(html)
//           res.end()
//         }
//       },
//       err => {
//         console.log(err)
//       }
//     )
//   })
// })

server.listen(port, () => {
  debugServer(`App SUCCESS run on port  ${port}`)
})
