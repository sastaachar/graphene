// action creator

import { IGnode } from '../gnode/models';
import { IPath } from '../path/models';
import {
  AddGnodeAction,
  ADD_NODE,
  AddPathAction,
  ADD_PATH,
  UpdateNodeAction,
  UPDATE_NODE,
  SetRootAction,
  SET_ROOT,
  UnvisitAllAction,
  UNVISIT_ALL,
  UpdatePathAction,
  UPDATE_PATH,
  SetDestinationAction,
  SET_DESTINATION,
} from './models/nodeManagerActionTypes';

export const addGnode = (gnode: IGnode): AddGnodeAction => ({
  type: ADD_NODE,
  payload: { gnode },
});

export const addPath = (path: IPath): AddPathAction => ({
  type: ADD_PATH,
  payload: { path },
});

export const updateNode = (updatedNode: IGnode): UpdateNodeAction => ({
  type: UPDATE_NODE,
  payload: { updatedNode },
});

export const setRoot = (nodeID: string | undefined): SetRootAction => ({
  type: SET_ROOT,
  payload: { nodeID },
});

export const unvisitAll = (): UnvisitAllAction => ({
  type: UNVISIT_ALL,
});

export const updatePath = (updatedPath: IPath): UpdatePathAction => ({
  type: UPDATE_PATH,
  payload: { updatedPath },
});

export const setDestination = (nodeID: string | undefined): SetDestinationAction => ({
  type: SET_DESTINATION,
  payload: { nodeID },
});
