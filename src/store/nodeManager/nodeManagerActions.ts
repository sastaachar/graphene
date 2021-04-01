// action creator

import { IGnode } from '../gnode/models';
import { IPath } from '../path/models';
import { AddGnodeAction, ADD_NODE, AddPathAction, ADD_PATH } from './models/nodeManagerActionTypes';

export const addGnode = (gnode: IGnode): AddGnodeAction => ({
  type: ADD_NODE,
  payload: { gnode },
});

export const addPath = (path: IPath): AddPathAction => ({
  type: ADD_PATH,
  payload: { path },
});
