import { NodeType, type BaseNode, type NodeConfig } from "../Base.types"

export enum EntityName {
   BLOCK = "block",
   TRIANGLE = "triangle"
}

export interface EntityNode extends BaseNode {
   type: NodeType.ENTITY
   id: string
   name: EntityName
   label: string
   config: NodeConfig | undefined
}

export function isEntityNode(n: BaseNode): n is EntityNode {
   return n.type === NodeType.ENTITY && "config" in n
}
