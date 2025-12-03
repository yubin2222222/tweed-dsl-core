export const astParsed = [
   {
      type: "program",
      schemeType: "diagram",
      name: "flowchart",
      label: "Products diagram",
      nodes: [
         { type: "comment", value: "entities" },
         {
            type: "entity",
            name: "block",
            id: "block_id",
            label: "block label",
            config: undefined
         },
         {
            type: "entity",
            name: "triangle",
            id: "triangle_id",
            label: "triangle label",
            config: undefined
         },
         {
            type: "entity",
            name: "block",
            id: "block_1",
            label: undefined,
            config: { label: "block 1", theme: "default" }
         },
         {
            type: "entity",
            name: "block",
            id: "block_2",
            label: undefined,
            config: { label: "block 2", theme: "default" }
         }
      ]
   },
   {
      type: "program",
      schemeType: "diagram",
      name: "flowchart",
      label: "Products diagram __2",
      nodes: [
         {
            type: "directive",
            name: "group",
            id: "group_1",
            list: ["block_id", "triangle_id"]
         },
         {
            type: "directive",
            name: "group",
            id: "group_2",
            list: ["block_id", "triangle_id"]
         }
      ]
   }
]
