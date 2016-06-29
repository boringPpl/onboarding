export default function process (data, presenter) {
  let result = {}

  for (let key in presenter) {
    if (presenter[key] instanceof Function) {
      result[key] = presenter[key](data)
    } else {
      result[key] = data[presenter[key]]
    }
  }

  return result
}
