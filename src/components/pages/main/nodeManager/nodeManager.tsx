import React, { MouseEvent, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createGnode, IGnode } from '../../../../store/gnode/models';
import { bfs, dfs, dijkstra } from '../../../../store/nodeManager/algorithms';
import groupGraph from '../../../../store/nodeManager/algorithms/graphGrouping';
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
import { Checkbox } from '../../../shared/checkbox';
import { SelectSearch } from '../../../shared/select-search';
import { Gnode } from '../gnode';
import { Path } from '../path';
import { graphColors } from './graphColors';

import './nodeManager.scss';

interface Props extends PropsFromRedux {}

const NodeManager: React.FC<Props> = (props: Props) => {
  // for node data input
  const [inputData, setInputData] = useState('');

  const boardRef = useRef<HTMLDivElement>(null);

  const [modeState, setModeState] = useState(0);
  const [algorithmState, setAlgorithmState] = useState(0);
  const [sourceNode, setSourceNode] = useState<IGnode | null>(null);
  const [autoIncrement, setAutoIncrement] = useState(false);

  // create node
  const createNodeOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modeState != 0) return;
    if (inputData) {
      const intValue = parseInt(inputData);
      const nodeValue = intValue || inputData;
      console.log(intValue, nodeValue, intValue ?? inputData);
      const newGnode = createGnode(nodeValue, {
        x: e.pageX - (boardRef.current?.offsetLeft ?? 0) + (boardRef.current?.scrollLeft ?? 0),
        y: e.pageY - (boardRef.current?.offsetTop ?? 0) + (boardRef.current?.scrollTop ?? 0),
      });

      props.addGnode(newGnode);
      if ((intValue === 0 || intValue) && autoIncrement) {
        setInputData(intValue + 1 + '');
      }
    }
  };

  // create path
  const createPathOnClick = (sourceNode: IGnode, destinationNode: IGnode) => {
    if (destinationNode.id === sourceNode.id) {
      // no self loops for now
      console.log('No self loops');
      unselectSourceNode();
      return;
    }

    // check if path already exists
    const connections = props.nodeManager.graph.nodes[sourceNode.id].connections;
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      if (conn.nodeID === destinationNode.id) {
        // path already exists
        console.log('Path already exists');
        unselectSourceNode();
        return;
      }
    }

    const newPath = createPath(sourceNode, destinationNode, parseInt(inputData));
    props.addPath(newPath);

    unselectSourceNode();
    return;
  };

  const unselectSourceNode = () => {
    if (!sourceNode) return;
    // we need to use the latest version to update
    // TODO : use a property based update system
    const selectedNode = props.nodeManager.graph.nodes[sourceNode.id];
    selectedNode.state = 'default';
    props.updateNode(selectedNode);
    setSourceNode(null);
  };

  // create path
  const updateNodePairs = (node: IGnode) => {
    if (!sourceNode) {
      setSourceNode(node);
      node.state = 'selected';
      props.updateNode(node);
      return;
    }
    // source is set
    createPathOnClick(sourceNode, node);
  };

  const optionsMode = [
    { key: 0, value: 'Create Node' },
    { key: 1, value: 'Create Path' },
    { key: 2, value: 'Set Root' },
    { key: 3, value: 'Set Destination' },
  ];

  const updateModeSelection = (node: IGnode) => {
    // node is selected : do stuff to handle that
    switch (modeState) {
      case 1:
        // update node pairs to create path
        updateNodePairs(node);
        break;
      case 2:
        // set node as root
        if (props.nodeManager.graph.rootID !== node.id) props.setRoot(node.id);
        else props.setRoot(undefined);

        break;

      case 3:
        if (props.nodeManager.graph.destinationID !== node.id) props.setDestination(node.id);
        else props.setDestination(undefined);
        break;
      default:
        break;
    }
  };

  const optionsAlgorithm = [
    { key: 0, value: 'BFS' },
    { key: 1, value: 'DFS' },
    { key: 2, value: 'Dijkstra' },
    { key: 3, value: 'Group graph' },
  ];

  const updateAlgoSelection = () => {
    switch (algorithmState) {
      case 0:
        bfs(props.nodeManager.graph, props.updateNode);
        break;

      case 1:
        dfs(props.nodeManager.graph, props.updateNode);
        break;

      case 2:
        dijkstra(props.nodeManager.graph, props.updateNode, props.updatePath);
        break;

      case 3:
        groupGraph(props.nodeManager.graph, graphColors, props.updateNode);
        break;
      default:
        break;
    }
  };

  return (
    <div className="nodemanager">
      <div className="left-panel">
        <input
          type="text"
          className="left-panel-input small-box"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <div className="left-panel-selection">
          <span>mode :</span>
          <SelectSearch
            options={optionsMode}
            defaultSlectText="Select Mode"
            defaultSelectKey={0}
            setOptionState={setModeState}
          ></SelectSearch>
        </div>
        <div className="left-panel-selection">
          <span>algorithm :</span>
          <SelectSearch
            options={optionsAlgorithm}
            defaultSlectText="Select Mode"
            defaultSelectKey={0}
            setOptionState={setAlgorithmState}
          ></SelectSearch>
        </div>

        <button className="left-panel-start small-box" onClick={updateAlgoSelection}>
          start
        </button>

        <button className="small-box" onClick={() => props.unvisitAll()}>
          unvisit all
        </button>

        {modeState === 0 && (
          <div className="left-panel-checkbox-wrapper">
            <label htmlFor="">auto-increment</label>
            <Checkbox isChecked={autoIncrement} onClick={() => setAutoIncrement(!autoIncrement)} />
          </div>
        )}
      </div>
      <div className="right-panel" onClick={createNodeOnClick} ref={boardRef}>
        {Object.values(props.nodeManager.graph.nodes).map((node) => (
          <Gnode
            key={node.id}
            gnode={node}
            onNodeSelect={updateModeSelection}
            isRoot={node.id === props.nodeManager.graph.rootID}
            isDestination={node.id === props.nodeManager.graph.destinationID}
          />
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
