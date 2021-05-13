import lexer from './src/lexer/index.js'
import parser from './src/parser/index.js'

export default function parse(code) {
  return parser(lexer(code))
}
