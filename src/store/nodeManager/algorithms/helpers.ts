// models
export interface Visited {
  [key: string]: boolean;
}
export interface PathCost {
  cost: number;
  nodeID: string;
}
export interface Costs {
  [key: string]: number;
}
export type PrevState = {
  pathID: string | null;
  parentID: string | null;
};
export interface Predecessor {
  [key: string]: PrevState;
}
