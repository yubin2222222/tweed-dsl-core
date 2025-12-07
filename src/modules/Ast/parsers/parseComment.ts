import { type ASTParser } from "../../../types/Ast.types"
import { NodeType } from "../../../types/SemanticModel"
import { TokenType } from "../../../types/Token.types"

export const parseComment: ASTParser = (ctx, L) => {
   const tok = ctx.current()
   if (tok?.type !== TokenType.comment) throw new Error("Expected comment")

   const match = tok.value.match(L.PROGRAM)

   if (match && match[1] && match[2] && match[3]) {
      return {
         type: NodeType.PROGRAM,
         schemeType: match[1],
         name: match[2],
         label: match[3],
         nodes: []
      }
   }

   ctx.consume() // Push next

   return {
      type: NodeType.COMMENT,
      value: tok.value
   }
}
