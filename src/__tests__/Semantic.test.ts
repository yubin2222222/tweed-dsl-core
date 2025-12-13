import { astParsed } from "../mocks/astParsed"
import { SemanticAnalyzer } from "../modules/SemanticAnalyzer/SemanticAnalyzer.controller"

describe("Semantic", () => {
   it("Analyze", () => {
      const result = new SemanticAnalyzer().analyze(astParsed)
      expect(result).toBeTruthy()
   })
})
