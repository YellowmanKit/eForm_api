import { sqlDate, deltaMinute } from '../utility/func'

export const to = promise => { return promise.then(data => [null, data]).catch(err => [err]) }
export const token = () => { return require('randomstring').generate(30) }
export const valid = async (req, db) => {
  const token = req.headers.token
  if(!token){ return false }
  var err, data
  [err, data] = await to(db.query(sql.select('users',['token=' + quote(token)])))
  if(data.length === 0){ return false }
  const user = data[0]
  const lastLogin = new Date(user.last_login)
  if(deltaMinute(lastLogin, new Date()) > 20){ return false }
  [err, data] = await to(db.query(sql.update('users', [
    'last_login=' + sqlDate(new Date())
  ], ['id=' + user.id])))
  return true
}
const quote = query => {
  var newQuery = ''
  query = query.split('=')
  for(var i=0;i<query.length;i++){
    newQuery += query[i]
    if(i < query.length - 1){
      newQuery += '=\"'
      var next = query[i+1].split(' ')
      query[i+1] = ''
      for(var j=0;j<next.length;j++){
        query[i+1] += next[j]
        if(j === 0){ query[i+1] += '\"'}
        query[i+1] += ' '
      }
    }
  }
  return newQuery
}
export const sql = {
  select: (table, conditions) => {
    var query = 'SELECT * FROM ' + table
    if(conditions){ query += sql.conditions(conditions) }
    return quote(query)
  },
  insert: (table, data) => {
    var query = 'INSERT INTO ' + table + ' ('
    for(var key in data){
      query += key + ', '
    }
    query = query.substring(0, query.length - 2)
    query += ') VALUES ('
    for(var key in data){
      query += '\"' + data[key] + '\", '
    }
    query = query.substring(0, query.length - 2)
    query += ')'
    return query
  },
  update: (table, values, conditions) => {
    var query = 'UPDATE ' + table + ' SET '
    for(var i=0;i<values.length;i++){
      query += values[i]
      if(i < values.length - 1){ query += ' ,' }
    }
    query += sql.conditions(conditions)
    return quote(query)
  },
  conditions: (conditions) => {
    var query = ' WHERE '
    for(var i=0;i<conditions.length;i++){
      query += conditions[i]
      if(i < conditions.length - 1){ query += ' AND ' }
    }
    return query
  }
}
