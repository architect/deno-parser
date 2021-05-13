/**
 * predicate for not-empty token
 *
 * @param {token}
 * @returns {boolean}
 */
export default function notempty(t) {
  return !(t.type == 'comment' || t.type == 'newline' || t.type === 'space')
}
