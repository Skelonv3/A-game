import { memo } from "react";

const Field = memo(({ x, y, hasPlayer, hasPoint }) =>
    <div
        className={`border border-black border-solid w-4 h-4 flex justify-center content-center ${hasPlayer ? 'bg-yellow' : ''} ${hasPoint ? 'bg-green' : ''}`}
        id={`x${x}y${y}`}
        data-testid="square"
        title={`x${x}y${y}`}
    />
);

export default Field