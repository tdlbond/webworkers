import Koa from 'koa'
import fs from 'fs'
import mime from 'mime-types'
import path from 'path'
import { fileURLToPath } from 'url'

const app = new Koa()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(async (ctx) => {
  if (ctx.request.url.includes('.')) {
    const filePath = path.join(__dirname, ctx.request.url)
    const file = fs.readFileSync(filePath)
    const mimeType = mime.lookup(filePath)

    ctx.response.type = mimeType
    ctx.response.body = file
  } else if (ctx.request.url.includes('/file')) {
    ctx.response.body = 'file'
  } else {
    ctx.response.body = 'hello world'
  }
})

app.listen(30010)
