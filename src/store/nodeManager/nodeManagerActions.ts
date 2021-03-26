// action creator

import { IGnode } from '../gnode/models';
import { AddGnodeAction, ADD_NODE } from './models/nodeManagerActionTypes';

export const addGnode = (gnode: IGnode): AddGnodeAction => ({
  type: ADD_NODE,
  payload: { gnode },
});
