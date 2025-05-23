export const toSQLPost = (props: any) => {
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

export const toSQLPut = (props: any) => {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const dollars = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
  return [values, dollars]
}

export const toSQLWhere = (props: Record<any, any>, isform?: boolean): [any[], string] => {
  const keys = Object.keys(props).filter(e => props[e] != '')
  const values = Object.values(props).filter(e => e != '')
  console.log(keys.length === values.length)
  const and = keys.map((e, i) => (`${isform ? `forms.` : ``}${e} = $${i + 1} and`)).join(' ').slice(0, -4)
  return [values, and]
}

export function toSQLArray(props: string[], key: string): [string, string, string[]]  {
  const values = [...new Set(props)]
  const answer = values.map((e, i) => `($${i + 1})`).join(', ')
  return [answer, key, values]
}

export function toSQLArrayObj(props: object[]): [string, string, any[]] {
  const valuesRaw = props.map(e => Object.entries(e).map(e => e[1]))
  let count = 1
  const answer = valuesRaw.flatMap((e, i) => {count += 2; return `($${count - 2}, $${count - 1})`}).join(', ')
  console.log('answers', answer)
  const keys = Object.keys(props[0])
  return [answer, keys.join(', '), valuesRaw.flatMap(e => e)]
}
