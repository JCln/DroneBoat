import { ENDirection, TPosition } from "../constants/enums";
import { vehicleController } from "./vehicle-controller";

export class BoatController extends vehicleController {
  private departed: boolean = false;

  constructor(
    initialPosition: TPosition,
    gridWidth: number,
    gridHeight: number
  ) {
    super(initialPosition, gridWidth, gridHeight);
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
    return this.rotateLeft();
  }
  public depart(position: TPosition): TPosition {
    this.position = { ...position };
    this.departed = true;
    return this.getPosition();
  }

  public starBoard(): TPosition {
    return this.rotateRight();
  }

  public sail(): TPosition {
    return this.forward();
  }
  public backward(): TPosition {
    return super.backward();
  }
  public reset() {
    const newPosition = super.reset();
    this.setPosition(newPosition);
    this.setDeparted(false);
    return newPosition;
  }

  public getRotationStyle(): string {
    const { direction } = this.position;

    const rotationMap = {
      [ENDirection.EAST]: 'rotate(90deg)',
      [ENDirection.NORTH]: 'rotate(0deg)',
      [ENDirection.WEST]: 'rotate(-90deg)',
      [ENDirection.SOUTH]: 'rotate(180deg)',
    };

    return rotationMap[direction];
  }

  public isValidPosition(position: TPosition): boolean {
    return (
      position.x >= 0 &&
      position.x < this.gridWidth &&
      position.y >= 0 &&
      position.y < this.gridHeight
    );
  }
  public hasDeparted(): boolean {
    return this.departed;
  }

  public setDeparted(v: boolean) {
    this.departed = v;
  }

}