import { v4 as uuidv4 } from 'uuid';
import { Position } from '../../sharedModels';

type NodeStates = 'default' | 'root' | 'selected';

export interface Connection {
  nodeID: string;
  pathID: string;
}
export interface IGnode {
  id: string;
  data: number;
  visited: boolean;
  state: NodeStates;
  connections: Connection[];
  pos: Position;
}

export const createGnode = (data: number, pos: Position): IGnode => {
  return {
    id: uuidv4(),
    data,
    state: 'default',
    visited: false,
    connections: [],
    pos,
  };
};
