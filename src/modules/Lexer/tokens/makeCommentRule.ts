import type { TLexical, TSyntaxChars } from "../../../types/Syntax.types"
import { TokenType, type TokenRule } from "../../../types/Token.types"
import { readUntil } from "../../../utils/readUntil"

export function makeCommentRule(S: TSyntaxChars, L: TLexical): TokenRule {
   return {
      name: TokenType.comment,
      match(input, i) {
         if (S.COMMENT !== input[i]) return null

         const end = readUntil(input, i, (c) => L.NEWLINE.test(c))
         const value = end === -1 ? input.slice(i + 1) : input.slice(i + 1, end)

         return {
            end: end === -1 ? input.length : end + 1,
            value: value.trim()
         }
      }
   }
}
