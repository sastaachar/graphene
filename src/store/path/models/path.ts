import { v4 as uuidv4 } from 'uuid';

import { Position } from '../../sharedModels';

type PathState = 'default' | 'travel' | 'warn';

export interface IPath {
  id: string;
  sourceId: string;
  destinationId: string;
  sourcePos: Position;
  destinationPos: Position;
  state: PathState;
  weight?: number;
}

export const createPath = (
  source: { id: string; pos: Position },
  destination: { id: string; pos: Position },
  weight?: number,
): IPath => {
  return {
    id: uuidv4(),
    sourceId: source.id,
    destinationId: destination.id,
    sourcePos: source.pos,
    destinationPos: destination.pos,
    state: 'default',
    weight: weight || undefined,
  };
};
