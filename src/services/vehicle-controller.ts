import { ENDirection, TPosition } from "../constants/enums";
import { AbstractVehicle } from "./abstract-vehicle";

export class vehicleController extends AbstractVehicle {
    protected position: TPosition;
    protected gridWidth: number;
    protected gridHeight: number;
    constructor(
        initialPosition: TPosition,
        gridWidth: number,
        gridHeight: number
    ) {
        super(initialPosition, gridWidth, gridHeight);
        this.position = { ...initialPosition };
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }
    moveTo(position: TPosition): TPosition {
        const nextPosition = position;
        return nextPosition;
    }
    rotateRight(): TPosition {
        const { x, y, direction } = this.position;

        const directionMap = {
            [ENDirection.WEST]: ENDirection.NORTH,
            [ENDirection.NORTH]: ENDirection.EAST,
            [ENDirection.EAST]: ENDirection.SOUTH,
            [ENDirection.SOUTH]: ENDirection.WEST,
        };

        return { x, y, direction: directionMap[direction] };
    }
    rotateLeft(): TPosition {
        const { x, y, direction } = this.position;

        const directionMap = {
            [ENDirection.NORTH]: ENDirection.WEST,
            [ENDirection.WEST]: ENDirection.SOUTH,
            [ENDirection.SOUTH]: ENDirection.EAST,
            [ENDirection.EAST]: ENDirection.NORTH,
        };

        return { x, y, direction: directionMap[direction] };
    }
    forward(): TPosition {
        let { x, y, direction } = this.position;
        y = Number(y);
        x = Number(x);
        switch (direction) {
            case ENDirection.NORTH:
                return { x, y: y - 1, direction };
            case ENDirection.EAST:
                return { x: x + 1, y, direction };
            case ENDirection.SOUTH:
                return { x, y: y + 1, direction };
            case ENDirection.WEST:
                return { x: x - 1, y, direction };
            default:
                return { x, y, direction };
        }
    }
    backward(): TPosition {
        const { x, y, direction } = this.position;

        switch (direction) {
            case ENDirection.NORTH:
                return { x, y: y + 1, direction };
            case ENDirection.EAST:
                return { x: x - 1, y, direction };
            case ENDirection.SOUTH:
                return { x, y: y - 1, direction };
            case ENDirection.WEST:
                return { x: x + 1, y, direction };
            default:
                return { x, y, direction };
        }
    }

    public sail(): TPosition {
        const { x, y, direction } = this.position;

        switch (direction) {
            case ENDirection.NORTH:
                return { x, y: y - 1, direction };
            case ENDirection.EAST:
                return { x: x + 1, y, direction };
            case ENDirection.SOUTH:
                return { x, y: y + 1, direction };
            case ENDirection.WEST:
                return { x: x - 1, y, direction };
            default:
                return { x, y, direction };
        }
    }

}