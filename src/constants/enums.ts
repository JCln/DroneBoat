export enum ENNaming {
    globalErrorUnExpected = 'globalErrorUnExpected',
    globalErrorAsync = 'globalErrorAsync',
    boatIsStillInHarbour = 'Boat still is in harbour!',
    boatShouldBeInFramework = 'boat should be in the framework!'
}
export enum ENDirection {
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST'
}
export type TPosition = {
    x: number;
    y: number;
    direction: ENDirection;
}
export type TMovements =
    'sail' |
    'port' |
    'starBoard' |
    'depart' |
    'reset' | 
    'backward'
