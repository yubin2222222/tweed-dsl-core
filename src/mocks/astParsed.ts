import type { IR } from "../types/Ir.types"
import {
   DirectiveName,
   EntityName,
   NodeType,
   ProgramName,
   ProgramSchemeType
} from "../types/SemanticModel"

export const astParsed: IR = [
   {
      type: NodeType.PROGRAM,
      schemeType: ProgramSchemeType.DIAGRAM,
      name: ProgramName.FLOWCHART,
      label: "Products diagram",
      nodes: [
         { type: NodeType.COMMENT, value: "entities" },
         {
            type: NodeType.ENTITY,
            name: EntityName.BLOCK,
            id: "block_id",
            label: "block label",
            config: undefined
         },
         {
            type: NodeType.ENTITY,
            name: EntityName.TRIANGLE,
            id: "triangle_id",
            label: "triangle label",
            config: undefined
         },
         {
            type: NodeType.ENTITY,
            name: EntityName.BLOCK,
            id: "block_1",
            label: undefined,
            config: { label: "block 1", theme: "default" }
         },
         {
            type: NodeType.ENTITY,
            name: EntityName.BLOCK,
            id: "block_2",
            label: undefined,
            config: { label: "block 2", theme: "default" }
         }
      ]
   },
   {
      type: NodeType.PROGRAM,
      schemeType: ProgramSchemeType.DIAGRAM,
      name: ProgramName.FLOWCHART,
      label: "Products diagram __2",
      nodes: [
         {
            type: NodeType.DIRECTIVE,
            name: DirectiveName.GROUP,
            id: "group_1",
            list: ["block_id", "triangle_id"]
         },
         {
            type: NodeType.DIRECTIVE,
            name: DirectiveName.GROUP,
            id: "group_2",
            list: ["block_id", "triangle_id"]
         }
      ]
   }
]
