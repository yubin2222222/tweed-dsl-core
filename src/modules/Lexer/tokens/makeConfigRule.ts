import type { TSyntaxChars } from "../../../types/Syntax.types"
import { TokenType, type TokenRule } from "../../../types/Token.types"
import { readUntil } from "../../../utils/readUntil"

export function makeConfigRule(S: TSyntaxChars): TokenRule {
   return {
      name: TokenType.config,
      match(input, i) {
         if (S.CONFIG_OPEN !== input[i]) return null

         const end = readUntil(input, i, (c) => c === S.CONFIG_CLOSE)
         if (end === -1) throw new Error(`Unclosed config at ${i}`)

         return {
            end: end + 1,
            value: input.slice(i + 1, end)
         }
      }
   }
}
