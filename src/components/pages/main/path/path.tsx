import React, { CSSProperties } from 'react';
import { IPath } from '../../../../store/path/models';

import './path.scss';

interface Props {
  path: IPath;
}

const Path: React.FC<Props> = (props) => {
  const style: CSSProperties = { stroke: props.path.state === 'travel' ? 'var(--green)' : 'var(--primary-darker)' };
  return (
    <div className="path-wrapper">
      <svg className="path" width="100%" height="100%">
        <line
          x1={props.path.sourcePos.x}
          y1={props.path.sourcePos.y}
          x2={props.path.destinationPos.x}
          y2={props.path.destinationPos.y}
          style={style}
        />
      </svg>
      {/* -20 - makes its closer the line looks better imo */}
      <span
        style={{
          position: 'absolute',
          left: (props.path.sourcePos.x + props.path.destinationPos.x) / 2,
          top: (props.path.sourcePos.y + props.path.destinationPos.y - 20) / 2,
          color: 'var(--yellow)',
          fontSize: '20px',
        }}
      >
        {props.path.weight}
      </span>
    </div>
  );
};

export default React.memo(Path);
