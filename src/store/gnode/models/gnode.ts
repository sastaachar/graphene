import { v4 as uuidv4 } from 'uuid';

export interface IGnode {
    id: string;
    data: number;
    visited: boolean;
    connections: number[];
}

export const createGnode = (data: number): IGnode => {
    return {
        id: uuidv4(),
        data,
        visited: false,
        connections: [],
    };
};
