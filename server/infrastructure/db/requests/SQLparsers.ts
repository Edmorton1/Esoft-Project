export function toSQLPost(props: any) {
  const {location, ...data} = props
  const keys = Object.keys(data)
  const values = Object.values(data)
  const locationSQL = `ST_SetSRID(ST_MakePoint($${values.length + 1}, $${values.length + 2}), 4326)`
  if (location) {
    keys.push('location')
    values.push(location.lng, location.lat)
  }
  const dollars = keys.map((e, i) => `$${i + 1}`).join(', ')
  console.log(dollars)
  return [keys.join(', '), values, location ? dollars.slice(0, -3) + locationSQL : dollars]
}

export function toSQLPut(props: any) {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const dollars = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
  return [values, dollars]
}

export function toSQLWhere(props: Record<any, any>, isform?: boolean): [any[], string] {
  const keys = Object.keys(props).filter(e => props[e] != '')
  const values = Object.values(props).filter(e => e != '')
  console.log(keys.length === values.length)
  const and = keys.map((e, i) => (`${isform ? `forms.` : ``}${e} = $${i + 1} and`)).join(' ').slice(0, -4)
  return [values, and]
}