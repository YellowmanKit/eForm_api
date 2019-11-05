import { version } from '../../../package.json'
import { sqlDate } from '../../utility/func'
import { to, sql, valid, token } from '../router'

export const router = (app, db) =>{

  app.post('/submit/insert', async (req, res) => {
    if(!await valid(req, db)){ return res.json({ err: 'invalid token' }) }
    var err, data
    [err, data] = await to(db.query(sql.insert('submissions', req.body)))
    return res.json({ err, data })
  })

}
