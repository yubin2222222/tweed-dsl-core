import type { BaseNode, NodeType } from "../Base.types"

export enum ProgramName {
   FLOWCHART = "flowchart"
}

export enum ProgramSchemeType {
   DIAGRAM = "diagram"
}

export interface ProgramNode extends BaseNode {
   type: NodeType.PROGRAM
   schemeType: ProgramSchemeType
   name: ProgramName
   label: string
   nodes: BaseNode[]
}
