import type { SemanticRule } from "../../../types/SemanticAnalyzer.types"
import { DirectiveName, isDirectiveNode } from "../../../types/SemanticModel"

export const directiveRule: SemanticRule = (n) => {
   if (!isDirectiveNode(n)) return false
   if (!Object.values(DirectiveName).includes(n.name)) return false

   return true
}
