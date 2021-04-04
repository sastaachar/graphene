import Stack from '../../../dataStructures/stack';
import { IGnode } from '../../gnode/models';
import { IGraph } from '../models';
import { UpdateNodeAction } from '../models/nodeManagerActionTypes';
import { Visited, visitNode } from './helpers';

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
      updateNode(visitNode(cur));
    }, delay);

    delay += 300;

    graph.nodes[cur.id].connections.forEach((conn) => {
      if (!visited[conn.nodeID]) s.push(conn.nodeID);
    });
  }

  console.log('DFS finished');
};

export default dfs;
