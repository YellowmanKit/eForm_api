import { version } from '../../../package.json'
import { sqlDate } from '../../utility/func'
import { to, sql, valid, token } from '../router'

export const router = (app, db) =>{

  app.get('/', (req, res) => {
    return res.json({ version })
  })

  app.post('/login', async (req,res) => {
    const id = req.headers.user_name
    const pw = req.headers.password
    var err, data
    [err, data] = await to(db.query(sql.select('users', ['user_name=' + id,'password=' + pw])))
    if(err){ return res.json({ err }) }
    var user = JSON.parse(JSON.stringify(data[0]))
    const newToken = token();
    [err, data] = await to(db.query(sql.update('users', [
      'token=' + newToken,
      'last_login=' + sqlDate(new Date())
    ], ['id=' + user.id])))
    if(err){ return res.json({ err }) }
    user.token = newToken
    return res.json({ err, user })
  })

  app.get('/sql/:sql', async (req, res) => {
    const sql = req.params.sql
    var err,

    [err, data] = await to(db.query(sql))
    return res.json({ err, data })
  })

}
