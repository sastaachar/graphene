import { v4 as uuidv4 } from 'uuid';

import { Position } from '../../sharedModels';

export interface IPath {
  id: string;
  sourceId: string;
  destinationId: string;
  sourcePos: Position;
  destinationPos: Position;
}

export const createPath = (
  source: { id: string; pos: Position },
  destination: { id: string; pos: Position },
): IPath => {
  return {
    id: uuidv4(),
    sourceId: source.id,
    destinationId: destination.id,
    sourcePos: source.pos,
    destinationPos: destination.pos,
  };
};