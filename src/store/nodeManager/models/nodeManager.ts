import { IPath } from '../../path/models';
import { IGnode } from '../../gnode/models';

export interface IGraph {
  nodes: {
    [key: string]: IGnode;
  };
  paths: {
    [key: string]: IPath;
  };
}

export interface INodeManager {
  graph: IGraph;
}
