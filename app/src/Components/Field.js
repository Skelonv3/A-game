import { memo } from "react";

const Field = memo(({ x, y, hasPlayer, hasPoint }) =>
    <div
        className={`square ${hasPlayer ? 'player' : ''} ${hasPoint ? 'point' : ''}`}
        id={`x${x}y${y}`}
        data-testid="square"
        title={`x${x}y${y}`}
    />
);

export default Field