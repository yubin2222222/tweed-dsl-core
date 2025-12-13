import type { IR } from "./Ir.types"
import type { BaseNode } from "./SemanticModel"

export interface ISemanticAnalyzer {
   analyze(ir: IR): boolean
}

export type SemanticRule = (node: BaseNode) => boolean
