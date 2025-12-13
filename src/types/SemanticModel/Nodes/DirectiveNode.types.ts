import { type BaseNode, NodeType, type NodeList } from "../Base.types"

export enum DirectiveName {
   GROUP = "group"
}

export interface DirectiveNode extends BaseNode {
   type: NodeType.DIRECTIVE
   id: string
   name: DirectiveName
   list: NodeList
}

export function isDirectiveNode(n: BaseNode): n is DirectiveNode {
   return n.type === NodeType.DIRECTIVE && "list" in n
}
