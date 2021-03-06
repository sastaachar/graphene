import { Reducer } from 'redux';
import { IPath } from '../path/models';

import { INodeManager } from './models';
import {
  ADD_NODE,
  ADD_PATH,
  DELETE_NODE,
  DELETE_PATH,
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
      const { nodeId } = action.payload;

      newState.graph.rootID = nodeId;
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
      const { nodeId } = action.payload;

      newState.graph.destinationID = nodeId;
      return newState;
    }
    case DELETE_NODE: {
      const { nodeId } = action.payload;

      const node = newState.graph.nodes[nodeId];

      node.connections.forEach((conn) => {
        const pathId = conn.pathID;
        delete newState.graph.paths[pathId];
      });

      delete newState.graph.nodes[nodeId];

      return newState;
    }
    case DELETE_PATH: {
      const { pathId } = action.payload;

      const path = newState.graph.paths[pathId];

      newState.graph.nodes[path.sourceId].connections = newState.graph.nodes[path.sourceId].connections.filter(
        (conn) => {
          conn.nodeID !== path.destinationId;
        },
      );

      delete newState.graph.paths[pathId];
      return newState;
    }

    default:
      return state;
  }
};
