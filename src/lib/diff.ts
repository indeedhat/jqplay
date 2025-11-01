interface Dict<T> {
  [key: string]: T
}

export enum Compare {
  Same,
  Added,
  Removed,
  Changed
}

const diff = (a: any, b: any): any => {
  if (a === undefined) {
    return Compare.Added
  }

  if (b === undefined) {
    return Compare.Removed
  }

  if (typeof a != typeof b) {
    return Compare.Changed
  }

  if (a === b) {
    return Compare.Same
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    let results: any[] = []
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      results.push(diff(a[i], b[i]))
    }

    return results
  }

  if (isObject(a) && isObject(b)) {
    const results: Dict<any> = {}
    const keys = new Set([
      ...Object.keys(a),
      ...Object.keys(b)
    ])

    for (const key of keys) {
      results[key] = diff(a[key], b[key])
    }

    return results
  }

  return Compare.Changed
}

const isObject = (val: any): boolean => (
  val && typeof val === 'object' && !Array.isArray(val)
)

export const findValue = (source: object | any[], query: string): any => {
  const parts = query.split(".")
  let cursor = source
  console.log(cursor, query)

  for (let i in parts) {
    try {
      console.log(parts[i])
      cursor = cursor![parts[i]] ?? undefined
      console.log(cursor)
    } catch (e) {
      console.log(e)
      cursor = undefined
    }

    if (cursor == undefined) {
      return cursor
    }
  }

  return cursor
}

export default diff
