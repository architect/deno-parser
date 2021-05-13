import compact from './_compact.js'
import type from './get-type.js'
import NotFound from '../errors/parse-pragma-not-found.js'
import AlreadyDefined from '../errors/parse-pragma-already-defined.js'
/**
 * parses tokens into JSON friendly structure if possible
 *
 * @param {array} raw tokens
 * @returns {object}
 */
export default function parse(raw, sourcemap = false) {
  const tokens = compact(raw)

  // arcfiles must begin with an @pragma
  if (tokens[0].type != 'pragma') {
    throw new NotFound
  }

  const arc = {}
  const src = {}
  let pragma = false
  let index = 0

  while (index < tokens.length) {
    let token = tokens[index]

    if (token.type === 'pragma') {
      // pragmas must be unique
      if ({}.hasOwnProperty.call(arc, token.value)) {
        throw new AlreadyDefined(token)
      }

      // create the pragma
      arc[token.value] = []

      // create a source map
      src[token.value] = []

      // keep a ref to the current pragma
      pragma = token.value
      index += 1
    }

    // ignore newlines and spaces
    let empty = token.type === 'newline' || token.type === 'space'
    if (empty) {
      index += 1
    }

    if (token.type === 'number' || token.type === 'boolean' || token.type === 'string') {
      let { end, value } = type({ tokens, index })
      arc[pragma].push(value)
      src[pragma].push({ start: token, end: tokens[index + end] })
      index += end
    }
  }

  return sourcemap ? { arc, src } : arc
}
