import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { createGnode } from '../../../store/gnode/models';
import { addGnode } from '../../../store/nodeManager/nodeManagerActions';
import { AppState } from '../../../store/rootStore';
import { Gnode } from '../gnode';

interface Props extends PropsFromRedux {}

const NodeManager: React.FC<Props> = (props: Props) => {
    const [inputData, setInputData] = useState('');

    const onClickHandler = () => {
        if (inputData) {
            const newGnode = createGnode(parseInt(inputData));
            props.addGnode(newGnode);
        }
    };

    return (
        <div>
            <input type="text" onChange={(e) => setInputData(e.target.value)} />
            <button onClick={onClickHandler}>NODE Manager</button>
            {props.nodeManager.graph.nodes.map((node) => (
                <Gnode gnode={node} key={node.id} />
            ))}
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
