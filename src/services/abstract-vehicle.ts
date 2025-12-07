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
    protected isValidMove(newPosition: TPosition): boolean {
        return (
            newPosition.x >= 0 &&
            newPosition.x < this.gridWidth &&
            newPosition.y >= 0 &&
            newPosition.y < this.gridHeight
        );
    }
}