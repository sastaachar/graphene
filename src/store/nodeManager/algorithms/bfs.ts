import Queue from '../../../dataStructures/queue';
import { IGnode } from '../../gnode/models';
import { IGraph } from '../models';
import { UpdateNodeAction } from '../models/nodeManagerActionTypes';

interface Visited {
  [key: string]: boolean;
}

const visitNode = (node: IGnode) => {
  const newNode = { ...node };
  newNode.visited = true;
  return newNode;
};

export const bfs = (graph: IGraph, updateNode: (x: IGnode) => UpdateNodeAction) => {
  if (!graph.rootID) {
    console.log('Root is not set');
    return;
  }

  console.log('Starting BFS');

  const q = new Queue<string>();
  q.push(graph.rootID);

  const visited: Visited = {};

  let delay: number = 0;

  while (!q.empty()) {
    const curId = q.pop() as string;
    console.log(curId);
    const cur = graph.nodes[curId];
    visited[cur.id] = true;

    setTimeout(() => {
      updateNode(visitNode(cur));
    }, delay);

    delay += 300;

    graph.nodes[cur.id].connections.forEach((conn) => {
      if (!visited[conn.nodeID]) q.push(conn.nodeID);
    });
  }

  console.log('BFS finished');
};
