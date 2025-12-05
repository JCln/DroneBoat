import { INITIAL_POSITION } from "../constants/actions";
import { ENDirection, TPosition } from "../constants/enums";

export class BoatController {
  private position: TPosition;
  private gridWidth: number;
  private gridHeight: number;

  constructor(
    initialPosition: TPosition,
    gridWidth: number,
    gridHeight: number
  ) {
    this.position = { ...initialPosition };
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
  }

  public getPosition(): TPosition {
    return { ...this.position };
  }

  public setPosition(position: TPosition) {
    this.position = { ...position };
  }

  public setGridSize(width: number, height: number) {
    this.gridWidth = width;
    this.gridHeight = height;
  }

  public port(): TPosition {
    const { x, y, direction } = this.position;

    const directionMap = {
      [ENDirection.NORTH]: ENDirection.WEST,
      [ENDirection.WEST]: ENDirection.SOUTH,
      [ENDirection.SOUTH]: ENDirection.EAST,
      [ENDirection.EAST]: ENDirection.NORTH,
    };

    return { x, y, direction: directionMap[direction] };
  }

  public starBoard(): TPosition {
    const { x, y, direction } = this.position;

    const directionMap = {
      [ENDirection.WEST]: ENDirection.NORTH,
      [ENDirection.NORTH]: ENDirection.EAST,
      [ENDirection.EAST]: ENDirection.SOUTH,
      [ENDirection.SOUTH]: ENDirection.WEST,
    };

    return { x, y, direction: directionMap[direction] };
  }

  public sail(): TPosition {
    const { x, y, direction } = this.position;

    switch (direction) {
      case ENDirection.NORTH:
        return { x, y: Math.max(0, y - 1), direction };
      case ENDirection.EAST:
        return { x: Math.min(this.gridWidth - 1, x + 1), y, direction };
      case ENDirection.SOUTH:
        return { x, y: Math.min(this.gridHeight - 1, y + 1), direction };
      case ENDirection.WEST:
        return { x: Math.max(0, x - 1), y, direction };
      default:
        return { x, y, direction };
    }
  }

  public reset(): TPosition {
    return INITIAL_POSITION;
  }

  public getRotationStyle(): string {
    const { direction } = this.position;

    const rotationMap = {
      [ENDirection.EAST]: 'rotate(90deg)',
      [ENDirection.NORTH]: 'rotate(0deg)',
      [ENDirection.WEST]: 'rotate(-90deg)',
      [ENDirection.SOUTH]: 'rotate(180deg)',
    };

    return rotationMap[direction] || 'rotate(0deg)';
  }

  public isValidPosition(position: TPosition): boolean {
    return (
      position.x >= 0 &&
      position.x < this.gridWidth &&
      position.y >= 0 &&
      position.y < this.gridHeight
    );
  }
}