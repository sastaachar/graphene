import { v4 as uuidv4 } from 'uuid';

type PathState = 'default' | 'travel' | 'warn';

export interface IPath {
  id: string;
  sourceId: string;
  destinationId: string;
  state: PathState;
  weight?: number;
}

export const createPath = (sourceId: string, destinationId: string, weight?: number): IPath => {
  return {
    id: uuidv4(),
    sourceId,
    destinationId,
    state: 'default',
    weight: weight || undefined,
  };
};
