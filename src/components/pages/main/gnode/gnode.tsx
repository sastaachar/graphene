import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IGnode } from '../../../../store/gnode/models';

import { updateNode } from '../../../../store/nodeManager/nodeManagerActions';

import './gnode.scss';

interface Props extends PropsFromRedux {
  gnode: IGnode;
  isRoot?: boolean;
  isDestination?: boolean;
  onNodeSelect: (node: IGnode) => void;
}

export const Gnode: React.FC<Props> = (props: Props) => {
  const isSelected = props.gnode.state === 'selected',
    isTouched = props.gnode.state === 'touched';
  let classNameOutside = 'gnode';
  classNameOutside += isSelected
    ? ' gnode--selected'
    : props.gnode.visited
    ? ' gnode--visited'
    : isTouched
    ? ' gnode--touched'
    : '';

  let classNameInside = 'gnode-inner';
  classNameInside += props.isRoot ? ' gnode--root' : props.isDestination ? ' gnode--destination' : '';

  const style: CSSProperties = {
    left: props.gnode.pos.x - 50,
    top: props.gnode.pos.y - 50,
  };

  const handleOnClick = () => {
    props.onNodeSelect(props.gnode);
  };

  return (
    <div className={classNameOutside} style={style} onClick={handleOnClick}>
      <div className={classNameInside}>
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
