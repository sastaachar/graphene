import React from 'react';
import { IPath } from '../../../store/path/models';

interface Props {
  path: IPath;
}

export const Path: React.FC<Props> = (props) => {
  return (
    <svg width="100%" height="100%">
      <line
        x1={props.path.sourcePos.x + 50}
        y1={props.path.sourcePos.y + 50}
        x2={props.path.destinationPos.x + 50}
        y2={props.path.destinationPos.y + 50}
        style={{ stroke: 'rgb(255,0,0)', strokeWidth: '2' }}
      />
    </svg>
  );
};
