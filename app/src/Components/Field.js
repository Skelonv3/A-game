import { memo } from "react";

const Field = memo(({ x, y, hasPlayer, hasPoint }) =>
    <div
        className={`border border-black border-solid w-6 h-6 flex justify-center content-center ${hasPlayer ? 'bg-yellow' : ''} ${hasPoint ? 'bg-light-green' : ''}`}
        id={`x${x}y${y}`}
        data-testid="square"
        title={`x${x}y${y}`}
    />
);

export default Field