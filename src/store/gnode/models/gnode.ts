import { v4 as uuidv4 } from 'uuid';

export interface IGnode {
  id: string;
  data: number;
  visited: boolean;
  connections: number[];
  pos: {
    x: number;
    y: number;
  };
}

export const createGnode = (data: number, pos = { x: 0, y: 0 }): IGnode => {
  return {
    id: uuidv4(),
    data,
    visited: false,
    connections: [],
    pos,
  };
};
