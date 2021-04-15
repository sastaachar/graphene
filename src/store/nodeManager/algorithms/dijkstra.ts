import { PriorityQueue } from '../../../dataStructures';
import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';
import { IGraph } from '../models';
import { UpdateNodeAction, UpdatePathAction } from '../models/nodeManagerActionTypes';
import { Visited, visitNode, visitPath } from './helpers';

// there should be no negative weights

interface PathCost {
  cost: number;
  nodeID: string;
}

interface Costs {
  [key: string]: number;
}
type PrevState = {
  pathID: string | null;
  parentID: string | null;
};
interface Predecessor {
  [key: string]: PrevState;
}

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
    return a.cost >= b.cost;
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

    console.log(cur.nodeID);
    const curNode = graph.nodes[cur.nodeID];
    visited[cur.nodeID] = true;

    setTimeout(() => {
      updateNode(visitNode(curNode));
    }, delay);

    delay += 300;

    graph.nodes[cur.nodeID].connections.forEach((conn) => {
      const pathCost = graph.paths[conn.pathID].weight ?? 10;
      if (!visited[conn.nodeID] && costs[conn.nodeID] > cur.cost + pathCost) {
        console.log('here');
        costs[conn.nodeID] = cur.cost + pathCost;
        q.push({ cost: costs[conn.nodeID], nodeID: conn.nodeID });
        pred[conn.nodeID] = { parentID: cur.nodeID, pathID: conn.pathID };
      }
    });
  }

  console.log(pred);

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
        // ! needs to be better
        else console.log(connPath, ' ERROR pathID empty');
      }, delay);

      delay += 300;
      prev = connPath.parentID;
    }
  }

  console.log(costs);
  console.log('Dijkstra finished');
};

export default dijkstra;
