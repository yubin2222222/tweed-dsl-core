export const SyntaxChars = {
   COMMENT: "#",
   DIRECTIVE: "@",
   ASSIGN: "=",

   STRING_QUOTE: '"',

   ID_OPEN: "[",
   ID_CLOSE: "]",

   CONFIG_OPEN: "{",
   CONFIG_CLOSE: "}",

   LIST_OPEN: "(",
   LIST_CLOSE: ")"
} as const

export const Lexical = {
   WHITESPACE: /[ \t]+/,
   NEWLINE: /\r?\n/,
   WORD: /[a-zA-Z_-]/
} as const

export const Separators = {
   LIST: /[,\s\n]+/,
   CONFIG: /[,\s\n]+/
} as const

export type TSyntaxChars = typeof SyntaxChars
export type TLexical = typeof Lexical
export type TSeparators = typeof Separators
