import React, { MouseEvent, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createGnode, IGnode } from '../../../store/gnode/models';
import { addGnode, addPath } from '../../../store/nodeManager/nodeManagerActions';
import { createPath } from '../../../store/path/models';
import { AppState } from '../../../store/rootStore';
import { Gnode } from '../gnode';
import { Path } from '../path';

import './nodemanager.scss';

interface Props extends PropsFromRedux {}

const NodeManager: React.FC<Props> = (props: Props) => {
  const [inputData, setInputData] = useState('');
  const [panelState, setPanelState] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const createNodeOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (panelState != 0) return;
    if (inputData) {
      const nodeValue = parseInt(inputData);
      if (!nodeValue) return;
      const newGnode = createGnode(nodeValue, {
        x: e.pageX - (boardRef.current?.offsetLeft ?? 0) - 50 + (boardRef.current?.scrollLeft ?? 0),
        y: e.pageY - (boardRef.current?.offsetTop ?? 0) - 50 + (boardRef.current?.scrollTop ?? 0),
      });
      props.addGnode(newGnode);
    }
  };

  const [sourceNode, setSourceNode] = useState<IGnode | null>(null);

  const updateNodeSelection = (node: IGnode) => {
    if (panelState != 1) return;
    if (!sourceNode) {
      setSourceNode(node);
      return;
    }
    // source is set

    // check if path already exists
    const connections = props.nodeManager.graph.nodes[sourceNode.id].connections;
    connections.forEach((conn) => {
      if (conn.nodeID === node.id) {
        // path already exists
        setSourceNode(null);
        return;
      }
    });

    // const newPath = createPath();
    // updateGnode  -> connections updated
    // updateGraph  -> adding path to paths
    const newPath = createPath(sourceNode, node);
    props.addPath(newPath);
    setSourceNode(null);
  };

  // 0 -> create node
  // 1 -> create path

  return (
    <div className="nodemanager">
      <div className="panel">
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
        <button onClick={() => setPanelState(0)}>create node</button>
        <button onClick={() => setPanelState(1)}>create path</button>
      </div>
      <div className="board" onClick={createNodeOnClick} ref={boardRef}>
        {Object.values(props.nodeManager.graph.nodes).map((node) => (
          <Gnode key={node.id} gnode={node} onNodeSelect={updateNodeSelection} />
        ))}
        {Object.values(props.nodeManager.graph.paths).map((path) => (
          <Path key={path.id} path={path} />
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
  addPath: addPath,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NodeManager);
