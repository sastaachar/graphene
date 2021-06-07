import { IGnode } from '../../gnode/models';
import { IPath } from '../../path/models';

// ACTION TYPES
export const ADD_NODE = 'ADD_NODE';
export interface AddGnodeAction {
  type: typeof ADD_NODE;
  payload: { gnode: IGnode };
}
export const REMOVE_NODE = 'REMOVE_NODE';
export interface RemoveGnodeAction {
  type: typeof REMOVE_NODE;
  payload: { nodeId: string };
}
export const UPDATE_NODE = 'UPDATE_NODE';

export interface UpdateNodeAction {
  type: typeof UPDATE_NODE;
  payload: { updatedNode: IGnode };
}

export const ADD_PATH = 'ADD_PATH';

export interface AddPathAction {
  type: typeof ADD_PATH;
  payload: { path: IPath };
}
export const REMOVE_PATH = 'REMOVE_PATH';
export interface RemovePathAction {
  type: typeof REMOVE_PATH;
  payload: { pathId: string };
}

export const SET_ROOT = 'SET_ROOT';
export interface SetRootAction {
  type: typeof SET_ROOT;
  payload: { nodeId: string | undefined };
}

export const UNVISIT_ALL = 'UNVISIT_ALL';
export interface UnvisitAllAction {
  type: typeof UNVISIT_ALL;
}

export const UPDATE_PATH = 'UPDATE_PATH';

export interface UpdatePathAction {
  type: typeof UPDATE_PATH;
  payload: { updatedPath: IPath };
}

export const SET_DESTINATION = 'SET_DESTINATION';

export interface SetDestinationAction {
  type: typeof SET_DESTINATION;
  payload: { nodeId: string | undefined };
}

export const DELETE_NODE = 'DELETE_NODE';
export interface DeleteNodeAction {
  type: typeof DELETE_NODE;
  payload: { nodeId: string };
}

export const DELETE_PATH = 'DELETE_PATH';
export interface DeletePathAction {
  type: typeof DELETE_PATH;
  payload: { pathId: string };
}

export type NodeMangerAction =
  | AddGnodeAction
  | RemoveGnodeAction
  | AddPathAction
  | RemovePathAction
  | UpdateNodeAction
  | SetRootAction
  | UnvisitAllAction
  | UpdatePathAction
  | SetDestinationAction
  | DeleteNodeAction
  | DeletePathAction;
