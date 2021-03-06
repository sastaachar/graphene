import { v4 as uuidv4 } from 'uuid';
import { Position } from '../../sharedModels';

import { Color } from '../../sharedModels';

type NodeStates = 'default' | 'root' | 'selected' | 'touched' | 'grouped';

export interface Connection {
  nodeID: string;
  pathID: string;
}
export interface IGnode {
  id: string;
  data: number | string;
  visited: boolean;
  state: NodeStates;
  connections: Connection[];
  pos: Position;
  group?: {
    id: string;
    color: Color;
  };
}

export const createGnode = (data: number | string, pos: Position): IGnode => {
  return {
    id: uuidv4(),
    data,
    state: 'default',
    visited: false,
    connections: [],
    pos,
  };
};
