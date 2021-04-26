import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IPath } from '../../../../store/path/models';
import { AppState } from '../../../../store/rootStore';

import './path.scss';

interface Props extends PropsFromRedux {
  path: IPath;
}

const Path: React.FC<Props> = (props) => {
  const style: CSSProperties = { stroke: props.path.state === 'travel' ? 'var(--green)' : 'var(--primary-darker)' };

  const sourcePos = props.nodes[props.path.sourceId].pos,
    destinationPos = props.nodes[props.path.destinationId].pos;

  const getIntersection = (m1: number, c1: number, m2: number, c2: number) => {
    const x = (c2 - c1) / (m1 - m2),
      y = m1 * x + c1;
    return { x, y };
  };
  const getPoint = (x1: number, y1: number, x2: number, y2: number) => {
    console.log(x1, y1, x2, y2);
    const m = (y2 - y1) / (x2 - x1),
      c = y1 - m * x1;
    console.log(m, c);

    const tan30 = 0.57735;

    const m1 = (m - tan30) / (1 + tan30 * m),
      c1 = y1 - m1 * x1;
    console.log(m1, c1);

    const tan150 = -1 * tan30;
    const m2 = (m - tan150) / (1 + tan150 * m),
      c2 = y2 - m2 * x2;
    console.log(m2, c2);

    return getIntersection(m1, c1, m2, c2);
  };

  const { x: xq, y: yq } = getPoint(sourcePos.x, -1 * sourcePos.y, destinationPos.x, -1 * destinationPos.y);
  return (
    <div className="path-wrapper">
      <svg className="path" width="100%" height="100%">
        <path
          id={props.path.id}
          d={`M ${sourcePos.x} ${sourcePos.y} Q ${xq} ${-1 * yq} ${destinationPos.x} ${destinationPos.y}`}
          style={style}
          fill="none"
        />
        <text
          style={{
            fill: 'var(--yellow)',
            fontSize: '22px',
          }}
        >
          <textPath href={`#${props.path.id}`} startOffset="50%" textAnchor="middle">
            {props.path.weight}
          </textPath>
        </text>
      </svg>
      {/* -20 - makes its closer the line looks better imo */}
      <span
        style={{
          position: 'absolute',
          left: (sourcePos.x + destinationPos.x) / 2,
          top: (sourcePos.y + destinationPos.y) / 2,
          color: 'var(--yellow)',
          fontSize: '20px',
        }}
      ></span>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  nodes: state.NodeManager.graph.nodes,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Path);
