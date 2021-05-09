import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IPath } from '../../../../store/path/models';
import { AppState } from '../../../../store/rootStore';
import { Position } from '../../../../store/sharedModels';

import './path.scss';

interface Props extends PropsFromRedux {
  path: IPath;
  _state?: string;
}

const Path: React.FC<Props> = (props) => {
  const pathColor =
    props.path.state === 'travel'
      ? 'var(--green)'
      : props.path.state === 'touched'
      ? 'var(--yello)'
      : props.path.state === 'warn'
      ? 'var(--red)'
      : 'var(--primary-darker)';
  const style: CSSProperties = { stroke: pathColor };

  const sourcePos = props.nodes[props.path.sourceId].pos,
    destinationPos = props.nodes[props.path.destinationId].pos;

  const getIntersection = (m1: number, c1: number, m2: number, c2: number) => {
    const x = (c2 - c1) / (m1 - m2),
      y = m1 * x + c1;
    return { x, y };
  };
  const getBezierPoint = (x1: number, y1: number, x2: number, y2: number): Position => {
    const m = (y2 - y1) / (x2 - x1);

    const tan30 = 0.57735;
    const tan150 = -1 * tan30;

    const m1 = (m - tan30) / (1 + tan30 * m),
      c1 = y1 - m1 * x1;

    const m2 = (m - tan150) / (1 + tan150 * m),
      c2 = y2 - m2 * x2;

    return getIntersection(m1, c1, m2, c2);
  };

  const getEndPoint = (x1: number, y1: number, x2: number, y2: number): Position => {
    const M = (y2 - y1) / (x2 - x1),
      C = y1 - M * x1;

    const a = 1 + M * M,
      b = 2 * (M * C - x2 - y2 * M),
      c = x2 * x2 + y2 * y2 + C * C - 2 * y2 * C - 2500,
      d = Math.sqrt(b * b - 4 * a * c);

    const ans1: Position = { x: 0, y: 0 };
    ans1.x = (-b + d) / (2 * a);
    ans1.y = ans1.x * M + C;

    const ans2: Position = { x: 0, y: 0 };
    ans2.x = (-b - d) / (2 * a);
    ans2.y = ans2.x * M + C;

    return Math.abs(ans1.x - x1) + Math.abs(ans1.y - y1) > Math.abs(ans2.x - x1) + Math.abs(ans2.y - y1) ? ans2 : ans1;
  };

  const convertPoint = (pos: Position): Position => {
    return {
      x: pos.x,
      y: -1 * pos.y,
    };
  };

  const endPoint = convertPoint(getEndPoint(sourcePos.x, -1 * sourcePos.y, destinationPos.x, -1 * destinationPos.y));
  // will refactor later
  const midX = (sourcePos.x + endPoint.x) / 2,
    midY = (sourcePos.y + endPoint.y) / 2;

  let bezier: string = '',
    textPos: Position = { x: 0, y: 0 };
  const pathType = props.path.type;

  if (pathType === 'line') {
    bezier = `M ${sourcePos.x} ${sourcePos.y} L ${endPoint.x} ${endPoint.y}`;
    textPos = { x: midX, y: midY };
  } else if (pathType === 'curve') {
    const bPoint = convertPoint(getBezierPoint(sourcePos.x, -1 * sourcePos.y, endPoint.x, -1 * endPoint.y));
    bezier = `M ${sourcePos.x} ${sourcePos.y} Q ${bPoint.x} ${bPoint.y} ${endPoint.x} ${endPoint.y}`;
    textPos = { x: (bPoint.x + midX) / 2, y: (bPoint.y + midY) / 2 };
  } else if (pathType === 'self') {
    // xq = destinationPos.x - 80;
    // yq = destinationPos.y - 80;
  } else {
    console.log('invalid type');
  }

  return (
    <div className="path-wrapper">
      <svg className="path" width="100%" height="100%">
        <defs>
          <marker
            id={`${props.path.id}-arrowhead`}
            markerWidth="10"
            markerHeight="7"
            refX="9.5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={pathColor} />
          </marker>
        </defs>
        <path
          id={props.path.id}
          d={bezier}
          style={style}
          fill="none"
          markerEnd={`url(#${props.path.id}-arrowhead)`}
        ></path>
      </svg>

      <span
        style={{
          position: 'absolute',
          left: textPos.x,
          top: textPos.y,
          color: 'var(--yellow)',
          fontSize: '20px',
        }}
      >
        {props.path.weight}
      </span>
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
