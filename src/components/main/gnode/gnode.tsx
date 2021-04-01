import React, { CSSProperties } from 'react';

import { IGnode } from '../../../store/gnode/models';

import './gnode.scss';

interface Props {
  gnode: IGnode;
  onNodeSelect: (node: IGnode) => void;
}

export const Gnode: React.FC<Props> = (props: Props) => {
  const style: CSSProperties = {
    left: props.gnode.pos.x,
    top: props.gnode.pos.y,
  };

  return (
    <div className="gnode" style={style} onClick={() => props.onNodeSelect(props.gnode)}>
      <span className="gnode-content">{props.gnode.data}</span>
    </div>
  );
};
