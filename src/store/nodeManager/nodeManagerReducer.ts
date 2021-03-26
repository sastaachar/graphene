import { Reducer } from 'redux';
import { INodeManager } from './models';
import { ADD_NODE, NodeMangerAction } from './models/nodeManagerActionTypes';

const defaultState: INodeManager = {
  graph: {
    nodes: [],
  },
};

export const NodeManagerReducer: Reducer<INodeManager, NodeMangerAction> = (
  state = defaultState,
  action: NodeMangerAction,
): INodeManager => {
  const newState: INodeManager = { ...state };
  switch (action.type) {
    case ADD_NODE:
      newState.graph.nodes.push(action.payload.gnode);
      return newState;
    default:
      return state;
  }
};
