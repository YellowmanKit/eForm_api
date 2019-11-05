import express from 'express'
import bodyParser from 'body-parser'
import db from './mysql/mysql'
const app = express()
app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))

import * as main from './router/control/main'
import * as form from './router/data/form'
import * as submit from './router/data/submit'

main.router(app, db)
form.router(app, db)
submit.router(app, db)

import http from 'http'
app.server = http.createServer(app)
app.server.listen(80, ()=>{ console.log('eForm is running at port ' + app.server.address().port) })
export default app
