import { IGnode } from '../../gnode/models';

export interface Visited {
  [key: string]: boolean;
}

export const visitNode = (node: IGnode) => {
  const newNode = { ...node };
  newNode.visited = true;
  return newNode;
};
