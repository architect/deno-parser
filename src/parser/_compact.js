import notempty from './_not-empty.js'
/**
 * removes comments and empty lines
 *
 * @param {array} tokens
 * @returns {array} tokens
 */
export default function compact(tokens) {
  // grabs a copy removing all comments
  const copy = tokens.slice(0).filter(t => t.type != 'comment')

  // get the indices of all newlines
  const newlines = copy.map((t, i) => t.type === 'newline' ? i : false).filter(Boolean)
  const newlinetokens = copy.map(t => t.type === 'newline' ? t : false).filter(Boolean)
  const newlinemap = []

  // get collection of lines: [[{token}, {token}], [{token, token}]]
  const lines = newlines.reduce(function linebreak (collection, newline, index) {
    let start = index === 0 ? index : newlines[index - 1] + 1
    let line = copy.slice(start, newline)
    let empty = line.filter(notempty).length === 0
    if (!empty) {
      collection.push(line)
      newlinemap.push(newlinetokens[newlines.indexOf(newline)])
    }
    return collection
  }, [])

  // flatten result; ignoring leading spaces and newlines
  let found = false
  let index = 0
  let result = []

  for (let line of lines) {
    for (let t of line) {
      let ignore = t.type == 'space' || t.type == 'newline'
      if (ignore === false && found === false) {
        found = true
      }
      if (found) {
        result.push(t)
      }
    }
    result.push(newlinemap[index])
    index += 1
  }

  return result
}
