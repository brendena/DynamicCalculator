export class GraphNode  {
  value: string;
  leftNode: GraphNode;
  rightNode: GraphNode;
  parentNode:GraphNode;
  constructor(value){
    this.value=value;
  }
}
