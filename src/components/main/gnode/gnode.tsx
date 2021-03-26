import React from 'react';
import { IGnode } from '../../../store/gnode/models';

// with cursive fonts
interface Props {
    gnode: IGnode;
}

export const Gnode: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <span>NODE : {props.gnode.data}</span>
        </div>
    );
};
