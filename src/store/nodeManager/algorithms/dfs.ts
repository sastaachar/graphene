import { Stack } from '../../../dataStructures';
import { IGnode } from '../../gnode/models';
import { IGraph } from '../models';
import { UpdateNodeAction } from '../models/nodeManagerActionTypes';
import { Visited } from './helpers';

const dfs = (graph: IGraph, updateNode: (x: IGnode) => UpdateNodeAction) => {
  if (!graph.rootID) {
    console.log('Root is not set');
    return;
  }

  console.log('Starting DFS');

  const s = new Stack<string>();
  s.push(graph.rootID);

  const visited: Visited = {};

  let delay: number = 0;

  while (!s.empty()) {
    const curId = s.pop() as string;
    console.log(curId);
    const cur = graph.nodes[curId];
    visited[cur.id] = true;

    setTimeout(() => {
      updateNode({ ...cur, visited: true });
    }, delay);

    delay += 300;

    graph.nodes[cur.id].connections.forEach((conn) => {
      const curNode = graph.nodes[conn.nodeID];
      if (!visited[conn.nodeID]) {
        s.push(conn.nodeID);
        setTimeout(() => {
          updateNode({ ...curNode, state: 'touched' });
        }, delay);
      }
    });
  }

  console.log('DFS finished');
};

export default dfs;
