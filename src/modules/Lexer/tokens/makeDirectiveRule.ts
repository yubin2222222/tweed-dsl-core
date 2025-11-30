import type { TLexical, TSyntaxChars } from "../../../types/Syntax.types"
import { TokenType, type TokenRule } from "../../../types/Token.types"
import { readUntil } from "../../../utils/readUntil"

export function makeDirectiveRule(S: TSyntaxChars, L: TLexical): TokenRule {
   return {
      name: TokenType.directive,
      match(input, i) {
         if (S.DIRECTIVE !== input[i]) return null
         const end = readUntil(input, i, (c) => L.WHITESPACE.test(c))

         return {
            end: end + 1,
            value: input.slice(i + 1, end)
         }
      }
   }
}
