import React, { MouseEvent, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createGnode } from '../../../store/gnode/models';
import { addGnode } from '../../../store/nodeManager/nodeManagerActions';
import { AppState } from '../../../store/rootStore';
import { Gnode } from '../gnode';

import './nodemanager.scss';

interface Props extends PropsFromRedux {}

const NodeManager: React.FC<Props> = (props: Props) => {
  const [inputData, setInputData] = useState('');
  const boardRef = useRef<HTMLDivElement>(null);

  const createNodeOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (inputData) {
      console.log(e.clientX, e.clientY, boardRef.current?.offsetLeft, boardRef.current?.offsetTop);
      const newGnode = createGnode(parseInt(inputData), {
        x: e.pageX - (boardRef.current?.offsetLeft ?? 0) - 50 + (boardRef.current?.scrollLeft ?? 0),
        y: e.pageY - (boardRef.current?.offsetTop ?? 0) - 50 + (boardRef.current?.scrollTop ?? 0),
      });
      props.addGnode(newGnode);
    }
  };

  return (
    <div className="nodemanager">
      <div className="panel">
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
      </div>
      <div className="board" onClick={createNodeOnClick} ref={boardRef}>
        {props.nodeManager.graph.nodes.map((node) => (
          <Gnode gnode={node} key={node.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  nodeManager: state.NodeManager,
});
const mapDispatchToProps = {
  addGnode: addGnode,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NodeManager);
