import type { TLexical, TSeparators, TSyntaxChars } from "./Syntax.types"

export interface ILexer {
   tokenize(input: string): Token[]
}

export interface ILexerConstructor {
   syntaxChars: TSyntaxChars
   lexical: TLexical
   separators: TSeparators
}

export interface Token {
   type: TokenType
   value: string
}

export enum TokenType {
   comment = "comment",
   directive = "directive",
   assign = "assign",
   string = "string",
   id = "id",
   config = "config",
   list = "list",
   word = "word"
}
