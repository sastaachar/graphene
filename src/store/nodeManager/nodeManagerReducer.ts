import { Reducer } from 'redux';

import { INodeManager } from './models';
import {
  ADD_NODE,
  ADD_PATH,
  NodeMangerAction,
  SET_ROOT,
  UNVISIT_ALL,
  UPDATE_NODE,
} from './models/nodeManagerActionTypes';

const defaultState: INodeManager = {
  graph: {
    nodes: {},
    paths: {},
  },
};

export const NodeManagerReducer: Reducer<INodeManager, NodeMangerAction> = (
  state = defaultState,
  action: NodeMangerAction,
): INodeManager => {
  const newState: INodeManager = { ...state };
  switch (action.type) {
    // adds a new node to state
    case ADD_NODE:
      const newNode = action.payload.gnode;
      newState.graph.nodes = { ...newState.graph.nodes, [newNode.id]: newNode };
      return newState;

    // adds a new path to state
    case ADD_PATH:
      const newPath = action.payload.path;
      newState.graph.paths = { ...newState.graph.paths, [newPath.id]: newPath };
      const oldConnections = newState.graph.nodes[newPath.sourceId].connections;
      newState.graph.nodes[newPath.sourceId].connections = [
        ...oldConnections,
        { nodeID: newPath.destinationId, pathID: newPath.id },
      ];
      return newState;

    // might regret this later
    case UPDATE_NODE:
      const { updatedNode } = action.payload;
      const previousNode = newState.graph.nodes[updatedNode.id];
      if (!previousNode) {
        return state;
      }
      // update the node
      newState.graph.nodes[updatedNode.id] = { ...previousNode, ...updatedNode };
      return newState;

    case SET_ROOT:
      const { nodeID } = action.payload;
      if (!newState.graph.nodes[nodeID]) {
        return state;
      }
      newState.graph.rootID = nodeID;
      return newState;

    case UNVISIT_ALL:
      Object.keys(newState.graph.nodes).forEach((nodeID) => {
        newState.graph.nodes[nodeID].visited = false;
      });
      return newState;

    default:
      return state;
  }
};
