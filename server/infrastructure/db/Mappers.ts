export function toTS(entity: any) {
    return entity.rows.length > 1 ? entity.rows : entity.rows[0]
  }

export function toSQL(domainModel: any) {
  if (typeof domainModel == "string" || typeof domainModel == "object") {
    return `'${domainModel}'`
  } else if (typeof domainModel == "undefined") {
    return 'IS NULL'
  } 
  return domainModel
}