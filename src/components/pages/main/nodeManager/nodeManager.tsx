import React, { MouseEvent, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createGnode, IGnode } from '../../../../store/gnode/models';
import { bfs, dfs, dijkstra } from '../../../../store/nodeManager/algorithms';
import {
  addGnode,
  addPath,
  setDestination,
  setRoot,
  unvisitAll,
  updateNode,
  updatePath,
} from '../../../../store/nodeManager/nodeManagerActions';
import { createPath } from '../../../../store/path/models';
import { AppState } from '../../../../store/rootStore';
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

  const unselectSourceNode = () => {
    if (!sourceNode) return;
    const selectedNode = sourceNode;
    selectedNode.state = 'default';
    props.updateNode(selectedNode);
    setSourceNode(null);
  };
  const updateNodePairs = (node: IGnode) => {
    if (!sourceNode) {
      setSourceNode(node);
      node.state = 'selected';
      props.updateNode(node);
      return;
    }
    // source is set

    if (node.id === sourceNode.id) {
      // no self loops for now
      console.log('No self loops');
      unselectSourceNode();
      return;
    }

    // check if path already exists
    const connections = props.nodeManager.graph.nodes[sourceNode.id].connections;
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      if (conn.nodeID === node.id) {
        // path already exists
        console.log('Path already exists');
        unselectSourceNode();
        return;
      }
    }

    const newPath = createPath(sourceNode, node);
    props.addPath(newPath);

    // const newPath = createPath();
    // updateGnode  -> connections updated
    // updateGraph  -> adding path to paths
    unselectSourceNode();
    return;
  };

  const updateNodeSelection = (node: IGnode) => {
    // node is selected : do stuff to handle that
    switch (panelState) {
      case 1:
        // update node pairs to create path
        updateNodePairs(node);
        break;
      case 2:
        // set node as root
        props.setRoot(node.id);
        break;

      case 3:
        props.setDestination(node.id);
        break;
      default:
        break;
    }
  };

  // 0 -> create node
  // 1 -> create path
  // 2 -> set Root
  return (
    <div className="nodemanager">
      <div className="left-panel">
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
        <button onClick={() => setPanelState(0)}>create node</button>
        <button onClick={() => setPanelState(1)}>create path</button>
        <button onClick={() => setPanelState(2)}>set root</button>
        <button onClick={() => setPanelState(3)}>set destination</button>
        <button onClick={() => props.unvisitAll()}>unvisit all</button>
        <button onClick={() => bfs(props.nodeManager.graph, props.updateNode)}>bfs</button>
        <button onClick={() => dfs(props.nodeManager.graph, props.updateNode)}>dfs</button>
        <button onClick={() => dijkstra(props.nodeManager.graph, props.updateNode, props.updatePath)}>dijkstra</button>
      </div>
      <div className="right-panel" onClick={createNodeOnClick} ref={boardRef}>
        {Object.values(props.nodeManager.graph.nodes).map((node) => (
          //! FIX : need to pass updateNode here or typescript starts crying
          <Gnode key={node.id} gnode={node} onNodeSelect={updateNodeSelection} updateNode={updateNode} />
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
  addGnode,
  addPath,
  setRoot,
  updateNode,
  unvisitAll,
  updatePath,
  setDestination,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NodeManager);
