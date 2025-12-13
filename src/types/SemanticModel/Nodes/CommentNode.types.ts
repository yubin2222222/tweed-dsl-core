import { NodeType, type BaseNode } from "../Base.types"

export interface CommentNode extends BaseNode {
   type: NodeType.COMMENT
   value: string
}

export function isCommentNode(n: BaseNode): n is CommentNode {
   return n.type === NodeType.COMMENT && "value" in n
}
