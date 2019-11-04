import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import db from './mysql/mysql'

import * as main from './router/main'

const app = express()
app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))

main.router(app, db)

app.server = http.createServer(app)
app.server.listen(80, ()=>{ console.log('eForm is running at port ' + app.server.address().port) })
export default app
