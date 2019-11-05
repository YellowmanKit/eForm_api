
import dotenv from 'dotenv'
const result = dotenv.config()
import mysql from 'mysql'
import util from 'util'

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user:  process.env.USER,
  password:  process.env.PASSWORD,
  database:  process.env.DATABASE,
})

db.query = util.promisify(db.query)

export default db
