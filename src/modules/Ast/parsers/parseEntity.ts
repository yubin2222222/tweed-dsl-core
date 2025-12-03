import { ASTNodeType, type ASTParser } from "../../../types/Ast.types"
import { TokenType } from "../../../types/Token.types"
import { parseConfig } from "../utils/parseConfig"

export const parseEntity: ASTParser = (ctx, L) => {
   const nameToken = ctx.expect(TokenType.word, "Expected entity name")
   const id = ctx.expect(TokenType.id, "Entity does not have id")

   // optional string label
   let label: string | undefined
   if (ctx.current()?.type === TokenType.string) {
      label = ctx.consume()!.value
   }

   // optional config
   let config: Record<string, any> | undefined
   if (ctx.current()?.type === TokenType.config) {
      const c = ctx.consume()!
      config = parseConfig(c.value, L)
   }

   return {
      type: ASTNodeType.ENTITY,
      name: nameToken.value,
      id: id.value,
      label,
      config
   }
}
