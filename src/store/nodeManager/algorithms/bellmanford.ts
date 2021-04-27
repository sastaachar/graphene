// perform bellman ford
// break if no changes occur
// if it goes on for n-1
//   perform more time to check for negative weighted loop
// mark negative weighted loop as warn

import { IPath } from '../../path/models';
import { IGraph } from '../models';
import { UpdatePathAction } from '../models/nodeManagerActionTypes';
import { Costs, Predecessor, PrevState } from './helpers';

const bellmanford = (graph: IGraph, updatePath: (x: IPath) => UpdatePathAction) => {
  if (!graph.rootID) {
    console.log('Root is not set');
    return;
  }

  console.log('Starting Bellmanford');

  const costs: Costs = {};
  const pred: Predecessor = {};
  let delay: number = 0;

  const paths: string[] = [];
  // add all the pathids
  Object.keys(graph.paths).forEach((k) => paths.push(k));
  Object.keys(graph.nodes).forEach((k) => (costs[k] = Infinity));
  costs[graph.rootID] = 0;

  const N: number = Object.keys(graph.nodes).length;
  const M: number = paths.length;

  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < M; j++) {
      const path = graph.paths[paths[j]];

      setTimeout(() => {
        updatePath({ ...graph.paths[path.id], state: 'touched' });
      }, delay);
      delay += 20;

      if (costs[path.destinationId] > costs[path.sourceId] + (path.weight ?? 0)) {
        // visit node and update pred
        costs[path.destinationId] = costs[path.sourceId] + (path.weight ?? 0);
        pred[path.destinationId] = { parentID: path.sourceId, pathID: path.id };
      }

      setTimeout(() => {
        updatePath({ ...graph.paths[path.id], state: 'default' });
      }, delay);
      delay += 20;
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
        if (connPath.pathID) updatePath({ ...graph.paths[connPath.pathID], state: 'travel' });
      }, delay);

      delay += 300;
      prev = connPath.parentID;
    }
  }
  console.log('hello', costs);

  Object.keys(costs).forEach((id) => {
    console.log(graph.nodes[id].data, costs[id]);
  });

  console.log('Bellmanford finished');
};

export default bellmanford;
