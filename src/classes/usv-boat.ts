import { toast } from "react-toastify";
import { ENDirection, ENNaming, TPosition } from "../constants/enums";
import { UtilsStatic } from "../services/utils";

export class USVBoat {
    private readonly areaWidth = 5;
    private readonly areaHeight = 5;
    private hasDeparted: boolean = false;
    private position: TPosition | null = null;
    private originPlace = { x: 0, y: 0, direction: ENDirection.WEST }

    private hasWithinArea(x: number, y: number): boolean {
        return x < this.areaWidth && y < this.areaHeight
    }
    public depart(x: number, y: number, f: ENDirection) {
        if (!UtilsStatic.isNull(this.position) && this.hasWithinArea(x, y)) {
            return { x, y, f }
        }
    }
    public sail() { }
    public port() { }
    public starBoard() { }
    public status() {
        return this.originPlace;
        //     x: this.position.x,
        //     y: this.position.y,
        //     f: this.position.direction
        // }
    }

    // DEPART X,Y, F
    // SAIL
    // PORT
    // STARBOARD
    // STATUS
}