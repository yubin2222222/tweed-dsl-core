import {
   TokenType,
   type ILexer,
   type ILexerConstructor,
   type Token
} from "../types/Lexer.types"
import type { TLexical, TSeparators, TSyntaxChars } from "../types/Syntax.types"

// TODO: Switch indexOf to manual loop. Optimized
// TODO: Add support for nested entities and add shielding.

export class Lexer implements ILexer {
   #SYNTAX_CHARS: TSyntaxChars
   #LEXICAL: TLexical
   #SEPARATORS: TSeparators

   constructor(props: ILexerConstructor) {
      this.#SYNTAX_CHARS = Object.freeze(props.syntaxChars)
      this.#LEXICAL = Object.freeze(props.lexical)
      this.#SEPARATORS = Object.freeze(props.separators)

      void this.#SEPARATORS
   }

   tokenize(input: string): Token[] {
      const tokens: Token[] = []
      let i = 0

      while (i < input.length) {
         const char = input[i]
         if (char === undefined) continue

         // Skip spacing
         if (this.#LEXICAL.WHITESPACE.test(char) || this.#LEXICAL.NEWLINE.test(char)) {
            i++
            continue
         }

         // ID
         if (this.#SYNTAX_CHARS.ID_OPEN === char) {
            const end = input.indexOf(this.#SYNTAX_CHARS.ID_CLOSE, i)
            if (end === -1) throw new Error(`Unclosed ID at ${i}`)
            tokens.push({ type: TokenType.id, value: input.slice(i + 1, end) })
            i = end + 1
            continue
         }

         // String
         if (this.#SYNTAX_CHARS.STRING_QUOTE === char) {
            let end = i + 1

            while (end < input.length && input[end] !== this.#SYNTAX_CHARS.STRING_QUOTE)
               end++

            if (end >= input.length) throw new Error(`Unclosed string at ${i}`)
            tokens.push({ type: TokenType.string, value: input.slice(i + 1, end) })
            i = end + 1
            continue
         }

         // Config
         if (this.#SYNTAX_CHARS.CONFIG_OPEN === char) {
            const end = input.indexOf(this.#SYNTAX_CHARS.CONFIG_CLOSE, i)
            if (end === -1) throw new Error(`Unclosed config at ${i}`)
            tokens.push({ type: TokenType.config, value: input.slice(i + 1, end) })
            i = end + 1
            continue
         }

         // List
         if (this.#SYNTAX_CHARS.LIST_OPEN === char) {
            const end = input.indexOf(this.#SYNTAX_CHARS.LIST_CLOSE, i)
            if (end === -1) throw new Error(`Unclosed list at ${i}`)
            tokens.push({ type: TokenType.list, value: input.slice(i + 1, end) })
            i = end + 1
            continue
         }

         // Directive
         if (this.#SYNTAX_CHARS.DIRECTIVE === char) {
            let end = i + 1

            while (
               end < input.length &&
               input[end] !== undefined &&
               !this.#LEXICAL.WHITESPACE.test(input[end] as string)
            ) {
               end++
            }

            tokens.push({ type: TokenType.directive, value: input.slice(i + 1, end) })
            i = end + 1
            continue
         }

         // Comment
         if (this.#SYNTAX_CHARS.COMMENT === char) {
            const end = input.indexOf("\n", i)

            const value = end === -1 ? input.slice(i + 1) : input.slice(i + 1, end)

            tokens.push({
               type: TokenType.comment,
               value: value.trim()
            })

            i = end === -1 ? input.length : end + 1
            continue
         }

         // Word or key word
         if (this.#LEXICAL.WORD.test(char)) {
            let end = i + 1
            while (end < input.length && /[a-zA-Z0-9_-]/.test(input[end] as string)) end++
            tokens.push({ type: TokenType.word, value: input.slice(i, end) })
            i = end
            continue
         }

         throw new Error(`Unexpected char ${char} at ${i}`)
      }

      return tokens
   }
}
