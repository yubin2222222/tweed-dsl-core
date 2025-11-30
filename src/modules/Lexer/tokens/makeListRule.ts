import type { TSyntaxChars } from "../../../types/Syntax.types"
import { TokenType, type TokenRule } from "../../../types/Token.types"
import { readUntil } from "../../../utils/readUntil"

export function makeListRule(S: TSyntaxChars): TokenRule {
   return {
      name: TokenType.list,
      match(input, i) {
         if (S.LIST_OPEN !== input[i]) return null

         const end = readUntil(input, i, (c) => c === S.LIST_CLOSE)
         if (end === -1) throw new Error(`Unclosed list at ${i}`)

         return {
            end: end + 1,
            value: input.slice(i + 1, end)
         }
      }
   }
}
