// we will color the diffrentt island in graph
// perform bfs on the graph for grouping

import { Queue } from '../../../dataStructures';
import { IGnode } from '../../gnode/models';
import { IGraph } from '../models';
import { UpdateNodeAction } from '../models/nodeManagerActionTypes';
import { Visited } from './helpers';

import { Color } from '../../sharedModels';

const groupGraph = (
  graph: IGraph,
  groupColors: Color[],
  soloColor: Color,
  updateNode: (x: IGnode) => UpdateNodeAction,
) => {
  console.log('Starting Grouping');

  const visited: Visited = {};
  let delay: number = 0;
  let groupId = -1;

  // TODO : change alpha values once color list is exhausted

  Object.values(graph.nodes).forEach((node) => {
    if (visited[node.id]) return;

    if (node.connections.length === 0) {
      // lonely node
      setTimeout(() => {
        updateNode({ ...node, state: 'grouped', group: { id: '' + -1, color: soloColor } });
      }, delay);
      delay += 150;
      return;
    }

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
        updateNode({ ...cur, state: 'grouped', group: { id: '' + groupId, color: groupColor } });
      }, delay);

      delay += 150;

      graph.nodes[cur.id].connections.forEach((conn) => {
        const curNode = graph.nodes[conn.nodeID];
        if (!visited[conn.nodeID]) {
          q.push(conn.nodeID);
          setTimeout(() => {
            updateNode({ ...curNode, state: 'touched' });
          }, delay);
        }
      });
    }
  });

  console.log('Grouping finished');
};

export default groupGraph;
