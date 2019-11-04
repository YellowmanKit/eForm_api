import mysql from 'mysql'
import util from 'util'

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'rm-3ns4b846po92f217jko.mysql.rds.aliyuncs.com',
  user: 'api_root_kit',
  password: 'eFormAPI-Server',
  database: 'asform_test_db'
})

db.query = util.promisify(db.query)

export default db
