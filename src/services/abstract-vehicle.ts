import { INITIAL_POSITION } from '../constants/actions';
import { TPosition } from '../constants/enums';

export abstract class AbstractVehicle {
    protected position: TPosition;
    protected gridWidth: number;
    protected gridHeight: number;

    constructor(
        initialPosition: TPosition,
        gridWidth: number,
        gridHeight: number
    ) {
        this.position = { ...initialPosition };
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }

    abstract rotateRight(): TPosition;
    abstract rotateLeft(): TPosition;
    abstract forward(): TPosition;
    abstract backward(): TPosition;
    abstract moveTo(position: TPosition): TPosition;

    public returnBack() { };
    public reset(): TPosition { return INITIAL_POSITION }
    protected isValidMove(nextPosition: TPosition): boolean {
        return (
            nextPosition.x >= 0 &&
            nextPosition.x < this.gridWidth &&
            nextPosition.y >= 0 &&
            nextPosition.y < this.gridHeight
        );
    }
}