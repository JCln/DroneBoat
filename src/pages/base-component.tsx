import { useRef, useState } from "react";
import { ENDirection, ENNaming, TMovements, TPosition } from "../constants/enums";
import { toast } from "react-toastify";
import { INITIAL_GRID_SIZE, INITIAL_POSITION } from "../constants/actions";
import { BoatController } from "../services/boat-controller";
import CommandWindow from "../components/command-window";
import ActionView from "../components/action-view";
import ActionButton from "../components/action-button";
import ControlAreaSize from "../components/control-area-size";

const Base = () => {
    let gridItems: any[] = [];
    const [viewHeightSize, setViewHeightSize] = useState<number>(INITIAL_GRID_SIZE);
    const [viewWidthSize, setViewWidthSize] = useState<number>(INITIAL_GRID_SIZE);
    const [position, setPosition] = useState<TPosition>(INITIAL_POSITION);
    const [auxMovement, setAuxMovement] = useState<TPosition>(INITIAL_POSITION);
    gridItems = [...Array(viewWidthSize * viewHeightSize).keys()];

    const boatController = useRef(
        new BoatController(position, viewWidthSize, viewHeightSize)
    ).current;

    const updateGridSize = (width: number, height: number) => {
        boatController.setGridSize(width, height);
    };
    const boatDirection = () => {
        return boatController.getRotationStyle();
    };
    const handleAreaWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const width = Number(e.target.value);
        setViewWidthSize(width);
        updateGridSize(width, viewHeightSize);
        boatController.reset();
    };
    const handleAreaHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const height = Number(e.target.value);
        setViewHeightSize(height);
        updateGridSize(viewWidthSize, height);
        boatController.reset();
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(value);

        setAuxMovement(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleClicked = (funcName: TMovements, item?: any): any => {
        let nextPosition: TPosition;

        switch (funcName) {
            case 'port':
                nextPosition = boatController.port();
                break
            case 'starBoard':
                nextPosition = boatController.starBoard();
                break
            case 'sail':
                nextPosition = boatController.sail();
                break
            case 'backward':
                nextPosition = boatController.backward();
                break
            case 'depart':
                nextPosition = boatController.depart(auxMovement);
                break
            case 'reset':
                nextPosition = boatController.reset();
                setPosition(nextPosition);
                setAuxMovement(INITIAL_POSITION);
                break;
            default:
                return position;
        }
        return nextPosition;
    }
    const handleValidation = (funcName: any, item?: any) => {
        const nextPosition = handleClicked(funcName);

        if (funcName === 'reset') {
            const newPosition = handleClicked('reset');
            setPosition(newPosition);
            boatController.setDeparted(true);
            return;
        }

        if (!boatController.hasDeparted() && funcName !== 'depart') {
            toast.error(ENNaming.boatIsStillInHarbour);
            return;
        }
        if (funcName === 'port' || funcName === 'starBoard') {
            if (boatController.isValidPosition(nextPosition)) {
                boatController.setPosition(nextPosition);
                setPosition(nextPosition);
            }
            return;
        }

        if (boatController.isValidPosition(nextPosition)) {
            boatController.setPosition(nextPosition);
            setPosition(nextPosition);

            if (funcName === 'depart') {
                boatController.setDeparted(true);
            }

        } else {
            toast.error(ENNaming.boatShouldBeInFramework);
        }
    };

    return (
        <div>
            <div className="main-wrapper">
                <h1 className="title">USV Drone Boat</h1>
                <div className="position-content">
                    <div className="command-section" style={{
                        minWidth: viewWidthSize + 'rem',
                        minHeight: viewHeightSize + 'rem'
                    }}>
                        <div className="" style={{ padding: '1rem' }}>
                            <ControlAreaSize
                                handleAreaHeight={handleAreaHeight}
                                handleAreaWidth={handleAreaWidth}
                                viewHeightSize={viewHeightSize}
                                viewWidthSize={viewWidthSize}
                            />
                            <div className="grid gap-8">
                                {/*  */}
                                <CommandWindow
                                    auxMovement={auxMovement}
                                    handleInputChange={handleInputChange}
                                    handleValidation={handleValidation}
                                />
                                {/*  */}
                                <ActionButton
                                    handleValidation={handleValidation}
                                />

                                {/* <div className="a-command-style">
                                <div>
                                    <p>Move the boat one meter forward</p>
                                </div>
                                <button
                                    onClick={status}
                                >
                                    status
                                </button>
                            </div> */}
                            </div>
                        </div >
                    </div >
                    {/*  */}
                    <ActionView
                        boatDirection={boatDirection}
                        gridItems={gridItems}
                        position={position}
                        viewHeightSize={viewHeightSize}
                        viewWidthSize={viewWidthSize}
                    />
                </div>
            </div>
        </div >
    );
};

export default Base;
