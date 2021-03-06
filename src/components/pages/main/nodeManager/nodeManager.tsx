import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createGnode, IGnode } from '../../../../store/gnode/models';
import { IPath, PathType } from '../../../../store/path/models';
import { bfs, dfs, dijkstra } from '../../../../store/nodeManager/algorithms';
import bellmanford from '../../../../store/nodeManager/algorithms/bellmanford';
import groupGraph from '../../../../store/nodeManager/algorithms/graphGrouping';
import {
  addGnode,
  addPath,
  setDestination,
  setRoot,
  unvisitAll,
  updateNode,
  updatePath,
  deleteNode,
  deletePath,
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

// ! Fix this
// _state has been to added to node and path to prevent
// re renders (performance optimizations using React.memo)

const NodeManager: React.FC<Props> = (props: Props) => {
  // for node data input
  const [inputData, setInputData] = useState('');

  const boardRef = useRef<HTMLDivElement>(null);

  const [modeState, setModeState] = useState(0);
  const [algorithmState, setAlgorithmState] = useState(0);

  const [sourceNode, setSourceNode] = useState<IGnode | null>(null);

  const [clickedNode, setClickedNode] = useState<IGnode | null>(null);
  const [clickedPath, setClickedPath] = useState<IPath | null>(null);

  const [autoIncrement, setAutoIncrement] = useState(false);

  useEffect(() => {
    if (clickedNode) handleNodeClickChange(clickedNode as IGnode);
  }, [clickedNode]);
  useEffect(() => {
    if (clickedPath) handlePathClickChange(clickedPath as IPath);
  }, [clickedPath]);

  const handleNodeClick = useCallback((node: IGnode) => {
    setClickedNode(node);
  }, []);
  const handlePathClick = useCallback((path: IPath) => {
    setClickedPath(path);
  }, []);

  // create node
  const createNodeOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modeState != 0) return;
    if (inputData) {
      const intValue = parseInt(inputData);
      const nodeValue = intValue || inputData;
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

  let pathType: PathType = 'line';
  // create path
  const createPathOnClick = (sourceNode: IGnode, destinationNode: IGnode) => {
    if (destinationNode.id === sourceNode.id) {
      // no self loops for now
      console.log('No self loops');
      return;
    }

    // check if path already exists
    const connections = props.nodeManager.graph.nodes[sourceNode.id].connections;
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      if (conn.nodeID === destinationNode.id) {
        // path already exists
        console.log('Path already exists');
        return;
      }
    }

    const destConnections = props.nodeManager.graph.nodes[destinationNode.id].connections;
    for (let i = 0; i < destConnections.length; i++) {
      const conn = destConnections[i];
      if (conn.nodeID === sourceNode.id) {
        // path already exists
        pathType = 'curve';
        break;
      }
    }

    const newPath = createPath(sourceNode.id, destinationNode.id, pathType, parseInt(inputData));
    props.addPath(newPath);
    return;
  };

  const unselectSourceNode = () => {
    if (!sourceNode) return;
    const selectedNode = props.nodeManager.graph.nodes[sourceNode.id];
    props.updateNode({ ...selectedNode, state: 'default' });
    setSourceNode(null);
  };

  const handleNodeClickChange = (node: IGnode) => {
    // node is selected : do stuff to handle that
    switch (modeState) {
      case 1:
        if (!sourceNode) {
          setSourceNode(node);
          props.updateNode({ ...node, state: 'selected' });
          return;
        }
        // update node pairs to create path
        createPathOnClick(sourceNode, node);
        unselectSourceNode();
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

      case 4:
        console.log(node.data, 'node deleted');
        props.deleteNode(node.id);
        break;

      default:
        break;
    }
    setClickedNode(null);
  };

  const handlePathClickChange = (path: IPath) => {
    // node is selected : do stuff to handle that
    switch (modeState) {
      case 4:
        console.log(path, 'node deleted');
        props.deletePath(path.id);
        break;

      default:
        break;
    }
    setClickedPath(null);
  };

  const handleAlgoStart = () => {
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
        groupGraph(props.nodeManager.graph, graphColors, [234, 252, 255, 1], props.updateNode);
        break;

      case 4:
        bellmanford(props.nodeManager.graph, props.updatePath);
        break;
      default:
        break;
    }
  };
  const optionsMode = [
    { key: 0, value: 'Create Node' },
    { key: 1, value: 'Create Path' },
    { key: 2, value: 'Set Root' },
    { key: 3, value: 'Set Destination' },
    { key: 4, value: 'Delete stuff' },
  ];
  const optionsAlgorithm = [
    { key: 0, value: 'BFS' },
    { key: 1, value: 'DFS' },
    { key: 2, value: 'Dijkstra' },
    { key: 3, value: 'Group graph' },
    { key: 4, value: 'Bellmanford' },
  ];

  // nodes not rerendering on state change

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
            keyState={modeState}
            onChange={(key) => setModeState(key as number)}
          ></SelectSearch>
        </div>
        <div className="left-panel-selection">
          <span>algorithm :</span>
          <SelectSearch
            options={optionsAlgorithm}
            defaultSlectText="Select Mode"
            keyState={algorithmState}
            onChange={(key) => setAlgorithmState(key as number)}
          ></SelectSearch>
        </div>

        <button className="left-panel-start small-box" onClick={handleAlgoStart}>
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
            _state={node.state + node.visited}
            onClick={handleNodeClick}
            isRoot={node.id === props.nodeManager.graph.rootID}
            isDestination={node.id === props.nodeManager.graph.destinationID}
          />
        ))}
        {Object.values(props.nodeManager.graph.paths).map((path) => (
          <Path key={path.id} path={path} _state={path.state} onClick={handlePathClick} />
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
  deleteNode,
  deletePath,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NodeManager);
