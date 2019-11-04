import { version } from '../../package.json'
import { to, quote, sql, valid } from './router'

export const router = (app, db) =>{

  app.get('/', (req, res) => {
    return res.json({ version })
  })

  app.post('/login', async (req,res) => {
    const id = req.headers.user_name
    const pw = req.headers.password
    var err, data
    [err, data] = await to(db.query(sql.select('users', ['user_name=' + quote(id),'password=' + quote(pw)])))
    return res.json({ err, user: data[0] })
  })

  app.post('/submissions/insert', async (req, res) => {
    if(!await valid(req, db)){ return res.json({ err: 'invalid user_key' }) }
    var err, data
    [err, data] = await to(db.query(sql.insert('submissions', req.body)))
    return res.json({ err, data })
  })

  app.get('/forms', async (req, res) => {
    if(!await valid(req, db)){ return res.json({ err: 'invalid user_key' }) }
    var err, data
    [err, data] = await to(db.query(sql.select('forms')))
    return res.json({ err, forms: data })
  })

  app.get('/forms/:code', async (req, res) => {
    if(!await valid(req, db)){ return res.json({ err: 'invalid user_key' }) }
    const code = req.params.code
    var err, data
    [err, data] = await to(db.query(sql.select('forms', ['form_code=' + quote(code)])))
    return res.json({ err, form: data[0] })
  })

  app.get('/sql/:sql', async (req, res) => {
    const sql = req.params.sql
    var err, data
    [err, data] = await to(db.query(sql))
    return res.json({ err, data })
  })

}
