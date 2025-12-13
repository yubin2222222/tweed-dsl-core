import type { SemanticRule } from "../../../types/SemanticAnalyzer.types"
import {
   isProgramNode,
   ProgramName,
   ProgramSchemeType
} from "../../../types/SemanticModel"

export const programRule: SemanticRule = (n) => {
   if (!isProgramNode(n)) return false

   if (!Object.values(ProgramSchemeType).includes(n.schemeType)) return false
   if (!Object.values(ProgramName).includes(n.name)) return false

   return true
}
