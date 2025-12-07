import { type ASTParser, type IAST, type IASTConstructor } from "../../types/Ast.types"
import { NodeType, type ProgramNode } from "../../types/SemanticModel"
import type { TLexical } from "../../types/Syntax.types"
import { TokenType, type Token } from "../../types/Token.types"
import { parseComment } from "./parsers/parseComment"
import { parseDirective } from "./parsers/parseDirective"
import { parseEntity } from "./parsers/parseEntity"

export class AST implements IAST {
   readonly #TOKEN_PARSERS: Record<string, ASTParser>
   readonly #TOKENS: readonly Token[]
   readonly #L: TLexical

   #i = 0

   constructor(props: IASTConstructor) {
      this.#TOKENS = Object.freeze(props.tokens)
      this.#L = Object.freeze(props.lexical)

      this.#TOKEN_PARSERS = {
         [TokenType.comment]: parseComment,
         [TokenType.directive]: parseDirective,
         [TokenType.word]: parseEntity
      }
   }

   public parse(): ProgramNode[] {
      const programs: ProgramNode[] = []

      while (!this.eof()) {
         const t = this.current()
         if (!t) break

         if (t.type !== TokenType.comment) {
            this.consume()
            continue
         }

         const program = parseComment(this, this.#L)
         if (program.type === NodeType.PROGRAM) {
            this.consume()
            programs.push(program as ProgramNode)
            this.#walker(program as ProgramNode)
         }
      }

      return programs
   }

   #walker(program: ProgramNode) {
      while (!this.eof()) {
         const t = this.current()
         if (!t) break

         const parser = this.#TOKEN_PARSERS?.[t.type]
         if (!parser) {
            this.consume()
            continue
         }

         const node = parser(this, this.#L)
         if (node.type === NodeType.PROGRAM) break
         program.nodes.push(node)
      }
   }

   public current(): Token | null {
      return this.#TOKENS[this.#i] ?? null
   }

   public consume(): Token | null {
      const t = this.current()
      if (t) this.#i++
      return t
   }

   public expect(type: TokenType, err: string): Token {
      const t = this.current()
      if (!t || t.type !== type) throw new Error(err)
      this.consume()
      return t
   }

   public peek(offset = 1): Token | null {
      return this.#TOKENS[this.#i + offset] ?? null
   }

   public eof(): boolean {
      return this.#i >= this.#TOKENS.length
   }
}
