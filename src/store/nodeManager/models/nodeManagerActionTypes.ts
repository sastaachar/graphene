import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';

// ACTION TYPES
export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';

export const ADD_PATH = 'ADD_PATH';
export const REMOVE_PATH = 'REMOVE_PATH';

export interface AddGnodeAction {
  type: typeof ADD_NODE;
  payload: { gnode: IGnode };
}

export interface RemoveGnodeAction {
  type: typeof REMOVE_NODE;
  payload: { nodeID: string };
}

export interface AddPathAction {
  type: typeof ADD_PATH;
  payload: { path: IPath };
}

export interface RemovePathAction {
  type: typeof REMOVE_PATH;
  payload: { pathID: string };
}

export type NodeMangerAction = AddGnodeAction | RemoveGnodeAction | AddPathAction | RemovePathAction;
