import notempty from './_not-empty.js'
import SpaceError from '../errors/parse-array-illegal-space.js'
/**
 * extract an array value from a list of tokens
 *
 * @param {lines} an array of tokens
 * @returns {object} {end, value}
 */
export default function array (lines) {
  const copy = lines.slice(0)
  const end = copy[0].length + 1
  const value = copy[0].filter(notempty).map(t => t.value)

  const nextline = copy.length > 1 && lines[1][0].type == 'space'
  if (nextline) {
    throw new SpaceError(lines[1][0])
  }

  return { end, value }
}
