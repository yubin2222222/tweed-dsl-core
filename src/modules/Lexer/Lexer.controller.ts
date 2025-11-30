import { type ILexer, type ILexerConstructor } from "../../types/Lexer.types"
import { TokenType, type Token, type TokenRule } from "../../types/Token.types"
import { makeCommentRule } from "./tokens/makeCommentRule"
import { makeConfigRule } from "./tokens/makeConfigRule"
import { makeDirectiveRule } from "./tokens/makeDirectiveRule"
import { makeIdRule } from "./tokens/makeIdRule"
import { makeListRule } from "./tokens/makeListRule"
import { makeStringRule } from "./tokens/makeStringRule"
import { makeWhitespaceRule } from "./tokens/makeWhitespaceRule"
import { makeWordRule } from "./tokens/makeWordRule"

export class Lexer implements ILexer {
   #rules: TokenRule[]

   constructor(props: ILexerConstructor) {
      const S = Object.freeze(props.syntaxChars)
      const L = Object.freeze(props.lexical)

      this.#rules = [
         makeWhitespaceRule(L),
         makeIdRule(S),
         makeConfigRule(S),
         makeListRule(S),
         makeDirectiveRule(S, L),
         makeCommentRule(S, L),
         makeStringRule(S),
         makeWordRule(L)
      ]
   }

   tokenize(input: string): Token[] {
      const tokens: Token[] = []
      let i = 0

      while (i < input.length) {
         let matched = false

         for (const rule of this.#rules) {
            const res = rule.match(input, i)

            if (res) {
               if (rule.name !== TokenType.whitespace) {
                  tokens.push({ type: rule.name, value: res.value })
               }

               i = res.end
               matched = true
               break
            }
         }

         if (!matched) throw new Error(`Lexer stuck at ${i}`)
      }

      return tokens
   }
}
