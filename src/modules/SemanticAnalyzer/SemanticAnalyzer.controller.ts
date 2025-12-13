import type { IR } from "../../types/Ir.types"
import type { ISemanticAnalyzer, SemanticRule } from "../../types/SemanticAnalyzer.types"
import { NodeType, type BaseNode, type ProgramNode } from "../../types/SemanticModel"
import { commentRule } from "./rules/commentRule"
import { directiveRule } from "./rules/directiveRule"
import { entityRule } from "./rules/entityRule"
import { programRule } from "./rules/programRule"

export class SemanticAnalyzer implements ISemanticAnalyzer {
   #rules: Record<NodeType, SemanticRule>

   constructor() {
      this.#rules = {
         [NodeType.PROGRAM]: programRule,
         [NodeType.DIRECTIVE]: directiveRule,
         [NodeType.COMMENT]: commentRule,
         [NodeType.ENTITY]: entityRule
      }
   }

   public analyze(ir: IR): boolean {
      for (const program of ir) {
         if (!this.#expectProgram(program)) return false
      }

      return true
   }

   #expectProgram(programNode: ProgramNode): boolean {
      if (!this.#rules.program(programNode)) return false

      for (const node of programNode.nodes) {
         if (!this.#expectNode(node)) return false
      }

      return true
   }

   #expectNode(node: BaseNode): boolean {
      const rule = this.#rules[node.type]
      if (!rule) throw new Error(`Unexpected rule for node ${node.type}`)
      return rule(node)
   }
}
