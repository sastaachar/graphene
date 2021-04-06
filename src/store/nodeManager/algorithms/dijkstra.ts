import { PriorityQueue } from '../../../dataStructures';
import { IGnode } from '../../gnode/models';
import { IGraph } from '../models';
import { UpdateNodeAction } from '../models/nodeManagerActionTypes';
import { Visited, visitNode } from './helpers';

// there should be no negative weights

interface PathCost {
  cost: number;
  nodeID: string;
}

interface Costs {
  [key: string]: number;
}

const dijkstra = (graph: IGraph, updateNode: (x: IGnode) => UpdateNodeAction) => {
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
        costs[conn.nodeID] = cur.cost + pathCost;
        q.push({ cost: costs[conn.nodeID], nodeID: conn.nodeID });
      }
    });
  }

  console.log(costs);
  console.log('Dijkstra finished');
};

export default dijkstra;
