import { TPosition } from "./enums"

export interface IVehicle {
    rotateRight(): TPosition
    rotateLeft(): TPosition
    forward(): TPosition
    backward(): TPosition
    moveTo(position: TPosition): TPosition
}

export interface IMovement {
    forward: string,
    backward: string,
    rotateRight: string,
    rotateLeft: string,
    moveTo: string,
}