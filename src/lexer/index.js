import {
  SPACE,
  TAB,
  NEWLINE,
  PRAGMA,
  COMMENT,
  STRING,
  NUMBER,
  BOOLEAN
} from './regexp.js'
import peek from './peek.js'
import UnknownError from '../errors/lex-unknown.js'
/**
 * tokenizes code including spaces and newlines (which are significant) and comments (which are not)
 *
 * @param {string} code
 * @returns {array} tokens [{type, value, line, column}]
 */
export default function lex(code) {
  // state bag for our tokens
  const tokens = []

  // ensure code is terminated by a newline (stripped out later)
  code += '\n'

  // counters
  let cursor = 0
  let line = 1
  let column = 1

  // stream the code one character at a time
  while (cursor < code.length) {
    if (PRAGMA.test(code[cursor])) {
      let token = peek.pragma(cursor, code, line, column)
      tokens.push({
        type: 'pragma',
        value: token.substring(1),
        line,
        column
      })
      cursor += token.length
      column += token.length
      continue
    }

    if (COMMENT.test(code[cursor])) {
      let token = peek.comment(cursor, code)
      tokens.push({
        type: 'comment',
        value: token,
        line,
        column
      })
      cursor += token.length
      column += token.length
      continue
    }

    if (SPACE.test(code[cursor])) {
      tokens.push({
        type: 'space',
        value: ' ',
        line,
        column
      })
      cursor += 1
      column += 1
      continue
    }

    // convert tabs to spaces
    if (TAB.test(code[cursor])) {
      tokens.push({
        type: 'space',
        value: ' ',
        line,
        column
      })
      tokens.push({
        type: 'space',
        value: ' ',
        line,
        column
      })
      cursor += 1
      column += 1
      continue
    }

    if (NEWLINE.test(code[cursor])) {
      tokens.push({
        type: 'newline',
        value: '\n',
        line,
        column
      })
      cursor += 1
      line += 1
      column = 1
      continue
    }

    /* order important! this comes before str */
    if (BOOLEAN.test(code[cursor])) {
      let tmp = peek.bool(cursor, code)
      let isBoolean = tmp === 'true' || tmp === 'false'
      if (isBoolean) {
        tokens.push({
          type: 'boolean',
          value: tmp === 'false' ? false : true, // questionable
          line,
          column
        })
        cursor += tmp.length
        column += tmp.length
        continue
      }
    }

    /* order important! this needs to come before str */
    if (NUMBER.test(code[cursor])) {
      let token = peek.number(cursor, code)
      if (!Number.isNaN(Number(token))) {
        tokens.push({
          type: 'number',
          value: Number(token),
          line,
          column
        })
        cursor += token.length
        column += token.length
        continue
      }
    }

    if (STRING.test(code[cursor])) {
      let token = peek.string(cursor, code, line, column)
      let quote = code[cursor] === '"'
      tokens.push({
        type: 'string',
        value: token,
        line,
        column
      })
      cursor += token.length + (quote ? 2 : 0)
      column += token.length + (quote ? 2 : 0)
      continue
    }

    throw new UnknownError({ character: code[cursor], line, column })
  }

  return tokens
}
