import React, { createRef, MouseEventHandler, ReactNode, useState } from 'react';

import './movable.scss';

interface MovableProps {
  children: ReactNode;
  enable?: boolean;
}

const Movable: React.FC<MovableProps> = (props: MovableProps) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [grabbed, setGrab] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardDiv = createRef<HTMLDivElement>();

  const handleOnDown: MouseEventHandler<HTMLDivElement> = (e) => {
    const x = cardDiv.current?.offsetLeft ?? 0 - e.clientX,
      y = cardDiv.current?.offsetTop ?? 0 - e.clientY;
    setOffset({ x, y });
    setGrab(true);
    console.log('called');
  };
  const handleMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const x = e.clientX + offset.x,
      y = e.clientY + offset.y;
    if (grabbed) setPos({ x, y });
    console.log('called2');
  };
  return (
    <>
      {true ? (
        <div
          className="movableCard noselect"
          style={{ left: pos.x, top: pos.y }}
          onMouseDown={handleOnDown}
          onMouseUp={() => setGrab(false)}
          onMouseLeave={() => setGrab(false)}
          onMouseMove={handleMove}
          ref={cardDiv}
        >
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Movable;
