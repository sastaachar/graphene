// we will color the diffrentt island in graph
// perform bfs on the graph for grouping

import { Queue } from '../../../dataStructures';
import { IGnode } from '../../gnode/models';
import { IGraph } from '../models';
import { UpdateNodeAction } from '../models/nodeManagerActionTypes';
import { groupNode, touchNode, Visited } from './helpers';

import { Color } from '../../sharedModels';

const groupGraph = (graph: IGraph, groupColors: Color[], updateNode: (x: IGnode) => UpdateNodeAction) => {
  console.log('Starting Grouping');

  const visited: Visited = {};
  let delay: number = 0;
  let groupId = -1;

  Object.values(graph.nodes).forEach((node) => {
    if (visited[node.id]) return;
    ++groupId;
    const groupColor = groupColors[groupId % groupColors.length];
    const q = new Queue<string>();
    q.push(node.id);
    while (!q.empty()) {
      const curId = q.pop() as string;
      console.log(curId);
      const cur = graph.nodes[curId];
      visited[cur.id] = true;

      setTimeout(() => {
        updateNode(groupNode(cur, '' + groupId, groupColor));
      }, delay);

      delay += 150;

      graph.nodes[cur.id].connections.forEach((conn) => {
        const curNode = graph.nodes[conn.nodeID];
        if (!visited[conn.nodeID]) {
          q.push(conn.nodeID);
          setTimeout(() => {
            updateNode(touchNode(curNode));
          }, delay);
        }
      });
    }
  });

  console.log('Grouping finished');
};

export default groupGraph;
