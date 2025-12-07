import type { BaseNode, ProgramNode } from "./SemanticModel"
import type { TLexical } from "./Syntax.types"
import type { Token, TokenType } from "./Token.types"

export interface IAST {
   parse(): ProgramNode[]
   current(): Token | null
   peek(offset?: number): Token | null
   consume(): Token | null
   eof(): boolean
   expect(type: TokenType, err: string): Token
}

export interface IASTConstructor {
   tokens: Token[]
   lexical: TLexical
}

export type ASTParser = (ctx: IAST, L: TLexical) => BaseNode
