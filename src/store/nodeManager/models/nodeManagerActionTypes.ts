import { IGnode } from '../../gnode/models';

// ACTION TYPES
export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';

export interface AddGnodeAction {
  type: typeof ADD_NODE;
  payload: {
    gnode: IGnode;
  };
}

export interface RemoveGnodeAction {
  type: typeof REMOVE_NODE;
  payload: {
    gnode: IGnode;
  };
}
export type NodeMangerAction = AddGnodeAction | RemoveGnodeAction;
