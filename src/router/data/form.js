import { version } from '../../../package.json'
import { sqlDate } from '../../utility/func'
import { to, sql, valid, token } from '../router'

export const router = (app, db) =>{

  app.get('/form', async (req, res) => {
    if(!await valid(req, db)){ return res.json({ err: 'invalid token' }) };
    var err, data;
    [err, data] = await to(db.query(sql.select('forms')));
    return res.json({ err, forms: data });
  })

  app.get('/form/:code', async (req, res) => {
    if(!await valid(req, db)){ return res.json({ err: 'invalid token' }) }
    const code = req.params.code
    var err, data
    [err, data] = await to(db.query(sql.select('forms', ['form_code=' + code])))
    return res.json({ err, form: data[0] })
  })

}
