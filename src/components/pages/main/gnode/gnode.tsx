import React, { CSSProperties, MouseEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IGnode } from '../../../../store/gnode/models';
import { Position } from '../../../../store/gnode/models/gnode';

import { updateNode } from '../../../../store/nodeManager/nodeManagerActions';

import './gnode.scss';

interface Props extends PropsFromRedux {
  gnode: IGnode;
  isRoot?: boolean;
  isDestination?: boolean;
  allowMove?: boolean;
  onNodeSelect: (node: IGnode) => void;
}

const Gnode: React.FC<Props> = (props: Props) => {
  const [grabbed, setGrabbed] = useState(false);
  const [moveStartPos, setMoveStartPos] = useState<Position>({ x: 0, y: 0 });

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

  let classNameInside = 'gnode-inner noselect ';
  classNameInside += props.isRoot ? ' gnode--root' : props.isDestination ? ' gnode--destination' : '';

  const style: CSSProperties = {
    left: props.gnode.pos.x - 50,
    top: props.gnode.pos.y - 50,
  };

  const handleOnClick = () => {
    props.onNodeSelect(props.gnode);
  };

  const handleMove = (e: MouseEvent) => {
    if (grabbed && props.allowMove) {
      console.log('Curr : ', props.gnode.pos, 'New ', {
        x: e.pageX - moveStartPos.x,
        y: e.pageY - moveStartPos.y,
      });
      const newNode = { ...props.gnode };
      newNode.pos = {
        x: props.gnode.pos.x + e.pageX - moveStartPos.x,
        y: props.gnode.pos.y + e.pageY - moveStartPos.y,
      };
      props.updateNode(newNode);
    }
  };

  return (
    <div
      className={classNameOutside}
      style={style}
      onClick={handleOnClick}
      onMouseDown={(e) => {
        setMoveStartPos({ x: e.pageX, y: e.pageY });
        setGrabbed(true);
      }}
      onMouseUp={() => setGrabbed(false)}
      onMouseLeave={() => setGrabbed(false)}
      onMouseMove={handleMove}
    >
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
