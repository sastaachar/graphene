import { v4 as uuidv4 } from 'uuid';
import { Position } from '../../sharedModels';

type NodeStates = 'default' | 'root' | 'selected' | 'touched';

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
