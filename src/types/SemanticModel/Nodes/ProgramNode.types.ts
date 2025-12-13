import { NodeType, type BaseNode } from "../Base.types"
import type { CommentNode } from "./CommentNode.types"
import type { DirectiveNode } from "./DirectiveNode.types"
import type { EntityNode } from "./EntityNode.types"

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
   nodes: (BaseNode | CommentNode | EntityNode | DirectiveNode)[]
}

export function isProgramNode(n: BaseNode): n is ProgramNode {
   return n.type === NodeType.PROGRAM && "schemeType" in n && "nodes" in n
}
