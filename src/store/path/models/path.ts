import { v4 as uuidv4 } from 'uuid';

type PathState = 'default' | 'travel' | 'warn' | 'touched';
export type PathType = 'line' | 'curve' | 'self';

export interface IPath {
  id: string;
  sourceId: string;
  destinationId: string;
  state: PathState;
  type: PathType;
  weight?: number;
}

export const createPath = (sourceId: string, destinationId: string, type: PathType, weight?: number): IPath => {
  return {
    id: uuidv4(),
    sourceId,
    destinationId,
    state: 'default',
    type,
    weight: weight || undefined,
  };
};
