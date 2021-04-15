import React, { CSSProperties } from 'react';
import { IPath } from '../../../../store/path/models';

import './path.scss';

interface Props {
  path: IPath;
}

export const Path: React.FC<Props> = (props) => {
  const style: CSSProperties = { stroke: props.path.state === 'travel' ? 'var(--green)' : 'var(--primary-darker)' };
  return (
    <svg className="path" width="100%" height="100%">
      <line
        x1={props.path.sourcePos.x + 50}
        y1={props.path.sourcePos.y + 50}
        x2={props.path.destinationPos.x + 50}
        y2={props.path.destinationPos.y + 50}
        style={style}
      />
    </svg>
  );
};
