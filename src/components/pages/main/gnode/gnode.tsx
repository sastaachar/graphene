import React, { CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IGnode } from '../../../../store/gnode/models';

import { updateNode } from '../../../../store/nodeManager/nodeManagerActions';

import './gnode.scss';

interface Props extends PropsFromRedux {
  gnode: IGnode;
  isRoot?: boolean;
  isDestination?: boolean;
  onClick: (node: IGnode) => void;
}

const Gnode: React.FC<Props> = (props: Props) => {
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
    props.onClick(props.gnode);
  };

  const innerStyle: CSSProperties = {};
  if (props.gnode.state === 'grouped') {
    const color = props.gnode.group?.color ?? [0, 0, 0, 0];
    innerStyle.backgroundColor = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
  }

  return (
    <div className={classNameOutside} style={style} onClick={handleOnClick}>
      <div className={classNameInside} style={innerStyle}>
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
