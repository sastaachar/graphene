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

  const sourceNode = props.nodes[props.path.sourceId];
  const destinationNode = props.nodes[props.path.destinationId];

  return (
    <div className="path-wrapper">
      <svg className="path" width="100%" height="100%">
        <line
          x1={sourceNode.pos.x}
          y1={sourceNode.pos.y}
          x2={destinationNode.pos.x}
          y2={destinationNode.pos.y}
          style={style}
        />
      </svg>
      {/* -20 - makes its closer the line looks better imo */}
      <span
        style={{
          position: 'absolute',
          left: (sourceNode.pos.x + destinationNode.pos.x) / 2,
          top: (sourceNode.pos.y + destinationNode.pos.y - 20) / 2,
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
