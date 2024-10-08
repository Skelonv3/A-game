import Field from "./Field";

function Board({ width, height, playerCoordinates, point }) {
    const playerInField = (x, y) => playerCoordinates.some(coor => x === coor.x && y === coor.y);
    const pointInField = (x, y) => point.x === x && point.y === y;
    return (
        <div className='justify-center grid'>
            {Array.from({ length: height }).map((_, y) =>
                <div className='flex' key={`row-${y}`} data-testid='row'>
                    {Array.from({ length: width }).map((_, x) => {
                        const hasPlayer = playerInField(x, y);
                        const hasPoint = pointInField(x, y);
                        return <Field key={`col-${y}-${x}`} x={x} y={y} hasPlayer={hasPlayer} hasPoint={hasPoint} />
                    }
                    )}
                </div>
            )}
        </div>
    )
}

export default Board;