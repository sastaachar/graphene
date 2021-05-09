// perform bellman ford
// break if no changes occur
// if it goes on for n-1
//   perform more time to check for negative weighted loop
// mark negative weighted loop as warn

import { IPath } from '../../path/models';
import { IGraph } from '../models';
import { UpdatePathAction } from '../models/nodeManagerActionTypes';
import { Costs, Predecessor, PrevState, Visited, visitPaths } from './helpers';

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

    let prev: string | null = graph.destinationID;

    const visited: Visited = {};
    const paths: string[] = [];
    let negativeCycle = false;
    while (prev) {
      const connPath: PrevState = pred[prev];

      if (!connPath) {
        // prev was never visted
        console.log("Can't reach ", prev);
        break;
      }

      if (visited[prev]) {
        // we have a negative cycle
        markCycle(prev, pred, graph, updatePath, delay);
        negativeCycle = true;
        break;
      }

      visited[prev] = true;

      if (connPath.pathID) paths.push(connPath.pathID);

      prev = connPath.parentID;
    }

    if (!negativeCycle) {
      visitPaths(paths, graph, updatePath, delay);
    }
  }
  console.log('Costs : ', costs);

  Object.keys(costs).forEach((id) => {
    console.log(graph.nodes[id].data, costs[id]);
  });

  console.log('Bellmanford finished');
};

const markCycle = (
  rootId: string,
  pred: Predecessor,
  graph: IGraph,
  updatePath: (x: IPath) => UpdatePathAction,
  delay = 0,
) => {
  // root -> pred[rid] -> pred[ pred[rid].pid ]

  let root = rootId;
  const loopPath = [];

  while (true) {
    const cur = pred[root];
    loopPath.push(cur.pathID);
    if (!cur.parentID) break;
    root = cur.parentID;
    if (root === rootId) break;
  }
  console.log('Negative weighted cycle detected');

  loopPath.forEach((pathId) => {
    if (!pathId) return;

    console.log(
      graph.nodes[graph.paths[pathId].sourceId].data,
      graph.nodes[graph.paths[pathId].destinationId].data,
      'negative cycle',
    );

    setTimeout(() => {
      updatePath({ ...graph.paths[pathId], state: 'warn' });
    }, delay);

    delay += 300;
  });
};

export default bellmanford;
