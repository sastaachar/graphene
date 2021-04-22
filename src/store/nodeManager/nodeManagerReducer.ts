import { Reducer } from 'redux';
import { IPath } from '../path/models';

import { INodeManager } from './models';
import {
  ADD_NODE,
  ADD_PATH,
  NodeMangerAction,
  SET_DESTINATION,
  SET_ROOT,
  UNVISIT_ALL,
  UPDATE_NODE,
  UPDATE_PATH,
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
    case ADD_NODE: {
      const newNode = action.payload.gnode;
      newState.graph.nodes = { ...newState.graph.nodes, [newNode.id]: newNode };
      return newState;
    }
    // adds a new path to state
    case ADD_PATH: {
      const newPath = action.payload.path;
      newState.graph.paths = { ...newState.graph.paths, [newPath.id]: newPath };
      const sourceOldConnections = newState.graph.nodes[newPath.sourceId].connections;
      newState.graph.nodes[newPath.sourceId].connections = [
        ...sourceOldConnections,
        { nodeID: newPath.destinationId, pathID: newPath.id },
      ];
      const destOldConnections = newState.graph.nodes[newPath.destinationId].connections;
      newState.graph.nodes[newPath.destinationId].connections = [
        ...destOldConnections,
        { nodeID: newPath.sourceId, pathID: newPath.id },
      ];
      return newState;
    }
    // might regret this later
    case UPDATE_NODE: {
      const { updatedNode } = action.payload;
      const previousNode = newState.graph.nodes[updatedNode.id];
      if (!previousNode) {
        return state;
      }
      // update the node
      newState.graph.nodes[updatedNode.id] = { ...previousNode, ...updatedNode };
      return newState;
    }
    case UPDATE_PATH: {
      const { updatedPath } = action.payload;
      const previousPath: IPath = newState.graph.paths[updatedPath.id];
      if (!previousPath) {
        return state;
      }
      // update the path
      newState.graph.paths[updatedPath.id] = { ...previousPath, ...updatedPath };
      return newState;
    }
    case SET_ROOT: {
      const { nodeID } = action.payload;

      newState.graph.rootID = nodeID;
      return newState;
    }
    case UNVISIT_ALL: {
      Object.keys(newState.graph.nodes).forEach((nodeID) => {
        newState.graph.nodes[nodeID].visited = false;
        newState.graph.nodes[nodeID].state = 'default';
      });
      Object.keys(newState.graph.paths).forEach((pathID) => {
        newState.graph.paths[pathID].state = 'default';
      });
      return newState;
    }
    case SET_DESTINATION: {
      const { nodeID } = action.payload;

      newState.graph.destinationID = nodeID;
      return newState;
    }
    default:
      return state;
  }
};
