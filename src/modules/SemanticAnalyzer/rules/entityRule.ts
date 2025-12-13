import type { SemanticRule } from "../../../types/SemanticAnalyzer.types"
import { EntityName, isEntityNode } from "../../../types/SemanticModel"

export const entityRule: SemanticRule = (n) => {
   if (!isEntityNode(n)) return false
   if (!Object.values(EntityName).includes(n.name)) return false

   return true
}
