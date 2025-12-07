import type { NodeList } from "../../../types/SemanticModel"
import type { TLexical } from "../../../types/Syntax.types"

export function parseList(s: string, L: TLexical): NodeList {
   return s.split(L.SEPARATOR).map((v) => v.trim())
}
