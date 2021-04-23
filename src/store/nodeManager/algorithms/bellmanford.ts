// perform bellman ford
// break if no changes occur
// if it goes on for n-1
//   perform more time to check for negative weighted loop
// mark negative weighted loop as warn

import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';
import { IGraph } from '../models';
import { UpdateNodeAction, UpdatePathAction } from '../models/nodeManagerActionTypes';
import { Costs, Predecessor, PrevState, touchNode, visitPath } from './helpers';

const bellmanford = (
  graph: IGraph,
  updateNode: (x: IGnode) => UpdateNodeAction,
  updatePath: (x: IPath) => UpdatePathAction,
) => {
  console.log('Starting Bellmanford');

  const costs: Costs = {};
  const pred: Predecessor = {};
  let delay: number = 0;

  const paths: string[] = [];
  // add all the pathids
  Object.keys(graph.paths).forEach((k) => paths.push(k));

  const N: number = Object.keys(graph.nodes).length;
  const M: number = paths.length;

  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < M; j++) {
      const path = graph.paths[paths[j]];

      // bi directional paths

      if (costs[path.destinationId] > costs[path.sourceId] + (path.weight ?? 0)) {
        // visit node and update pred
        costs[path.destinationId] = costs[path.sourceId] + (path.weight ?? 0);
        pred[path.destinationId] = { parentID: path.sourceId, pathID: path.id };
      }

      if (costs[path.sourceId] > costs[path.destinationId] + (path.weight ?? 0)) {
        // visit node and update pred
        costs[path.sourceId] = costs[path.destinationId] + (path.weight ?? 0);
        pred[path.sourceId] = { parentID: path.destinationId, pathID: path.id };
      }

      //  touch both source and destination
      setTimeout(() => {
        updateNode(touchNode(graph.nodes[path.sourceId]));
      }, delay);
      delay += 300;

      setTimeout(() => {
        updateNode(touchNode(graph.nodes[path.destinationId]));
      }, delay);
      delay += 300;
    }
  }

  if (graph.destinationID) {
    // destination id is set so we can find path

    // check if no path exists

    let prev: string | null = graph.destinationID;

    while (prev) {
      // update path

      const connPath: PrevState = pred[prev];

      if (!connPath) {
        // prev was never visted
        console.log("Can't reach ", prev);
        break;
      }
      setTimeout(() => {
        if (connPath.pathID) updatePath(visitPath(graph.paths[connPath.pathID]));
      }, delay);

      delay += 300;
      prev = connPath.parentID;
    }
  }

  console.log('Bellmanford finished');
};

export default bellmanford;
