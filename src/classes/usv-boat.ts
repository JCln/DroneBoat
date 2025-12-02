import { TPosition } from './../constants/enums';
import { toast } from "react-toastify";
import { ENDirection, ENNaming } from "../constants/enums";
import { UtilsStatic } from "../services/utils";

export class USVBoat {
    private readonly areaWidth = 5;
    private readonly areaHeight = 5;
    private hasDeparted: boolean = false;
    private position: TPosition | null = null;
    private originPlace = { x: 2, y: 2, direction: ENDirection.EAST }

    private hasWithinArea(position: TPosition): boolean {
        return position.x < this.areaWidth && position.y < this.areaHeight
    }
    public depart(position: TPosition) {
        if (!UtilsStatic.isNull(this.position) && this.hasWithinArea(position)) {
            return { position }
        }
    }
    public sail() { }
    public port() { }
    public starBoard() { }
    public status() {
        return this.originPlace;       
    }

    // DEPART X,Y, F
    // SAIL
    // PORT
    // STARBOARD
    // STATUS
}