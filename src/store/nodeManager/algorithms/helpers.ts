import { IPath } from '../../path/models';
import { IGraph } from '../models';
import { UpdatePathAction } from '../models/nodeManagerActionTypes';

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

// functions
export const visitPaths = (paths: string[], graph: IGraph, updatePath: (x: IPath) => UpdatePathAction, delay = 0) => {
  for (let i = paths.length - 1; i >= 0; i--) {
    const pathId = paths[i];
    setTimeout(() => {
      updatePath({ ...graph.paths[pathId], state: 'travel' });
    }, delay);
    delay += 300;
  }
};
