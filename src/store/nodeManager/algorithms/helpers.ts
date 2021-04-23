import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';
import { Color } from '../../sharedModels';

export interface Visited {
  [key: string]: boolean;
}

export const visitNode = (node: IGnode) => {
  const newNode = { ...node };
  newNode.visited = true;
  return newNode;
};

export const visitPath = (path: IPath) => {
  const newPath = { ...path };
  newPath.state = 'travel';
  return newPath;
};

export const touchNode = (node: IGnode) => {
  const newNode = { ...node };
  newNode.state = 'touched';
  return newNode;
};

export const groupNode = (node: IGnode, id: string, color: Color) => {
  const newNode = { ...node };
  newNode.state = 'grouped';
  newNode.group = {
    id,
    color,
  };
  return newNode;
};

// models

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
