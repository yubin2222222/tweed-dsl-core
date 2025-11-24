import { Lexer } from "../modules/Lexer.controller"
import { TokenType, type ILexer, type Token } from "../types/Lexer.types"
import { Lexical, Separators, SyntaxChars } from "../types/Syntax.types"

describe("Lexer", () => {
   let lexer: ILexer

   beforeAll(() => {
      lexer = new Lexer({
         syntaxChars: SyntaxChars,
         lexical: Lexical,
         separators: Separators
      })
   })

   it("Create AST", () => {
      const input = `
      # this is a comment

      # entities

      block [block_id] "block label"
      triangle [triangle_id] "triangle label"

      block [block_1] {label = "block 1", theme = "default"}
      block [block_2] {
         label = "block 2"
         theme = "default"
      }
      
      @group [group_1] (block_id, triangle_id)
      @group [group_2] (
         block_id
         triangle_id
      )
    `

      const ast = lexer.tokenize(input)

      const astResult: Token[] = [
         { type: TokenType.comment, value: "this is a comment" },

         { type: TokenType.comment, value: "entities" },

         { type: TokenType.word, value: "block" },
         { type: TokenType.id, value: "block_id" },
         { type: TokenType.string, value: "block label" },

         { type: TokenType.word, value: "triangle" },
         { type: TokenType.id, value: "triangle_id" },
         { type: TokenType.string, value: "triangle label" },

         { type: TokenType.word, value: "block" },
         { type: TokenType.id, value: "block_1" },
         { type: TokenType.config, value: 'label = "block 1", theme = "default"' },

         { type: TokenType.word, value: "block" },
         { type: TokenType.id, value: "block_2" },
         {
            type: TokenType.config,
            value: '\n         label = "block 2"\n         theme = "default"\n      '
         },

         { type: TokenType.directive, value: "group" },
         { type: TokenType.id, value: "group_1" },
         { type: TokenType.list, value: "block_id, triangle_id" },

         { type: TokenType.directive, value: "group" },
         { type: TokenType.id, value: "group_2" },
         {
            type: TokenType.list,
            value: "\n         block_id\n         triangle_id\n      "
         }
      ]

      expect(JSON.stringify(ast)).toEqual(JSON.stringify(astResult))
   })

   it("Throw unknown char", () => {
      const input = `
      # this is a comment

      # entities

      block [block_id] "block label"
      triangle [triangle_id] "triangle label"

      block [block_1] {label = "block 1", theme = "default"}
      block [block_2] {
         label = "block 2"
         theme = "default"
      }
      
      @group [group_1] (block_id, triangle_id)
      @group [group_2] (
         block_id
         triangle_id
      )

      ~
    `

      expect(() => lexer.tokenize(input)).toThrow(/Unexpected char/)
   })
})
