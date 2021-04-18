import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IGnode } from '../../../../store/gnode/models';

import { updateNode } from '../../../../store/nodeManager/nodeManagerActions';

import './gnode.scss';

interface Props extends PropsFromRedux {
  gnode: IGnode;
  onNodeSelect: (node: IGnode) => void;
}

export const Gnode: React.FC<Props> = (props: Props) => {
  const isSelected = props.gnode.state === 'selected';
  let className = 'gnode';
  className += isSelected ? ' gnode--selected' : props.gnode.visited ? ' gnode--visited' : '';

  const style: CSSProperties = {
    left: props.gnode.pos.x,
    top: props.gnode.pos.y,
  };

  const handleOnClick = () => {
    props.onNodeSelect(props.gnode);
  };

  return (
    <div className={className} style={style} onClick={handleOnClick}>
      <div className="gnode-inner">
        <span className="gnode-inner-content">{props.gnode.data}</span>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  updateNode,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Gnode);
