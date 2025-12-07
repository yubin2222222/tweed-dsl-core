import type { BaseNode, NodeConfig, NodeType } from "../Base.types"

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
