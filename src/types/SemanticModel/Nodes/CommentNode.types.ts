import type { BaseNode, NodeType } from "../Base.types"

export interface CommentNode extends BaseNode {
   type: NodeType.COMMENT
   value: string
}
