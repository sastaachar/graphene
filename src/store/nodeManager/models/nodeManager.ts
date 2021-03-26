import { IGnode } from '../../gnode/models';

export interface IGraph {
    nodes: IGnode[];
}

export interface INodeManager {
    graph: IGraph;
}
