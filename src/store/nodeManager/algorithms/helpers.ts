import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';

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
