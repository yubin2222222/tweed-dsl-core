import type { TSyntaxChars } from "../../../types/Syntax.types"
import { TokenType, type TokenRule } from "../../../types/Token.types"
import { readUntil } from "../../../utils/readUntil"

export function makeIdRule(S: TSyntaxChars): TokenRule {
   return {
      name: TokenType.id,
      match(input, i) {
         if (S.ID_OPEN !== input[i]) return null

         const end = readUntil(input, i, (c) => c === S.ID_CLOSE)
         if (end === -1) throw new Error(`Unclosed ID at ${i}`)

         return {
            end: end + 1,
            value: input.slice(i + 1, end)
         }
      }
   }
}
