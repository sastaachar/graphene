import { PriorityQueue } from '../../../dataStructures';
import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';
import { IGraph } from '../models';
import { UpdateNodeAction, UpdatePathAction } from '../models/nodeManagerActionTypes';
import { Costs, PathCost, Predecessor, PrevState, Visited } from './helpers';

// there should be no negative weights

const dijkstra = (
  graph: IGraph,
  updateNode: (x: IGnode) => UpdateNodeAction,
  updatePath: (x: IPath) => UpdatePathAction,
) => {
  if (!graph.rootID) {
    console.log('Root is not set');
    return;
  }

  console.log('Starting Dijkstra');

  const compare = (a: PathCost, b: PathCost): boolean => {
    return a.cost <= b.cost;
  };

  const costs: Costs = {};
  const visited: Visited = {};
  const q = new PriorityQueue<PathCost>(compare);

  const pred: Predecessor = {};

  pred[graph.rootID] = { pathID: null, parentID: null };

  Object.values(graph.nodes).forEach((node) => {
    costs[node.id] = Infinity;
  });

  costs[graph.rootID] = 0;
  q.push({ cost: 0, nodeID: graph.rootID });

  let delay: number = 0;

  while (!q.empty()) {
    const cur = q.pop() as PathCost;

    console.log(graph.nodes[cur.nodeID].data);
    const curNode = graph.nodes[cur.nodeID];
    visited[cur.nodeID] = true;

    setTimeout(() => {
      updateNode({ ...curNode, visited: true });
    }, delay);

    delay += 300;

    // if destination is set - break preemptively
    if (graph.destinationID === cur.nodeID) break;

    graph.nodes[cur.nodeID].connections.forEach((conn) => {
      const pathCost = graph.paths[conn.pathID].weight ?? 0;
      if (!visited[conn.nodeID] && costs[conn.nodeID] > cur.cost + pathCost) {
        costs[conn.nodeID] = cur.cost + pathCost;
        q.push({ cost: costs[conn.nodeID], nodeID: conn.nodeID });
        setTimeout(() => {
          updateNode({ ...curNode, state: 'touched' });
        }, delay);
        pred[conn.nodeID] = { parentID: cur.nodeID, pathID: conn.pathID };
      }
    });
  }

  if (graph.destinationID) {
    // destination id is set so we can find path

    // check if no path exists

    let prev: string | null = graph.destinationID;

    const paths: string[] = [];

    while (prev) {
      // update path

      const connPath: PrevState = pred[prev];

      if (!connPath) {
        // prev was never visted
        console.log("Can't reach ", prev);
        break;
      }
      if (connPath.pathID) paths.push(connPath.pathID);

      prev = connPath.parentID;
    }

    for (let i = paths.length - 1; i >= 0; i--) {
      const pathId = paths[i];
      setTimeout(() => {
        updatePath({ ...graph.paths[pathId], state: 'travel' });
      }, delay);
      delay += 300;
    }
  }

  Object.keys(costs).forEach((id) => {
    console.log(graph.nodes[id].data, costs[id]);
  });

  console.log('Dijkstra finished');
};

export default dijkstra;
