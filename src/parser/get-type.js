import notempty from './_not-empty.js'
import array from './array.js'
import vector from './vector.js'
import map from './map.js'
import TypeUnknown from '../errors/parse-type-unknown.js'
/**
 * extracts scalar, array, vector and map values
 *
 * @param {object} params
 * @param {array} params.tokens
 * @param {number} params.index
 *
 * @example
 * string-scalar-value
 *
 * array of values
 *
 * named
 *   vector
 *   of
 *   values
 *
 * map
 *   key value
 *   one true
 *   vector 1 2 3
 *
 * map
 *   named
 *     vector
 *     of
 *     values
 */
export default function type({ tokens, index }) {
  // working copy of the relevant tokens
  const working = tokens.slice(index, tokens.length)

  // get the indices of all newlines
  const newlines = working.map((t, i) => t.type === 'newline' ? i : false).filter(Boolean)

  // get collection of lines: [[{token}, {token}], [{token, token}]]
  const lines = newlines.reduce(function linebreak (collection, newline, index) {
    let start = index === 0 ? index : newlines[index - 1] + 1
    collection.push(working.slice(start, newline))
    return collection
  }, [])

  // extract the first three lines
  const [ first, second, third ] = lines

  // is the second line indented two spaces? (signaling a named vector or map value)
  const indent = Array.isArray(second) && second.length >= 3 && second[0].type === 'space' && second[1].type === 'space'

  // is the third line indented four spaces? (signaling a map with an initial named vector value)
  const vectorindent = Array.isArray(third) && third.length > 4 && third[0].type == 'space' && third[1].type == 'space' && third[2].type == 'space' && third[3].type == 'space'

  // is the second line a scalar (singular) value?
  const singular = second && second.filter(notempty).length === 1 && vectorindent === false

  const scalar = first.filter(notempty).length === 1

  // do we have a scalar string|number|boolean value?
  // do we have a possible array or vector value?
  // do we have a possible map value?
  const is = {
    scalar: scalar && indent === false, // string, number or boolean
    array: scalar === false, // array of scalar values
    vector: scalar && indent === true && singular === true, // vector of scalar values
    map: scalar && indent === true && singular === false // map of keys and values (scalar or vector)
  }

  if (is.scalar) {
    return { end: 1, value: tokens[index].value }
  }

  if (is.array) {
    return array(lines)
  }

  if (is.vector) {
    return vector(lines, index)
  }

  if (is.map) {
    return map(lines)
  }

  throw new TypeUnknown(tokens[index])
}
