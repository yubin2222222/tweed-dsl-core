import type { BaseNode, NodeType } from "../Base.types"

export enum DirectiveName {
   GROUP = "group"
}

export interface DirectiveNode extends BaseNode {
   type: NodeType.DIRECTIVE
   id: string
   name: DirectiveName
   list: NodeList
}
