export const to = promise => { return promise.then(data => [null, data]).catch(err => [err]) }
export const quote = string => { return '"' + string + '"' }
export const valid = async (req, db) => {
  const user_key = req.headers.user_key
  if(!user_key){ return false }
  var err, data
  [err, data] = await to(db.query(sql.select('users',['user_key=' + quote(user_key)])))
  return data.length > 0
}
export const sql = {
  select: (table, conditions) => {
    var sql = 'SELECT * FROM ' + table
    if(conditions){
      sql += ' WHERE '
      for(var i=0;i<conditions.length;i++){
        sql += conditions[i]
        if(i < conditions.length - 1){
          sql += ' AND '
        }
      }
    }
    return sql
  },
  insert: (table, data) => {
    var sql = 'INSERT INTO ' + table + ' ('
    for(var key in data){
      sql += key + ', '
    }
    sql = sql.substring(0, sql.length - 2)
    sql += ') VALUES ('
    for(var key in data){
      sql += quote(data[key]) + ', '
    }
    sql = sql.substring(0, sql.length - 2)
    sql += ')'
    return sql
  }
}
