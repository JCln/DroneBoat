import { useRef, useState } from "react";
import { ENDirection, ENNaming, TMovements, TPosition } from "../constants/enums";
import { INITIAL_GRID_SIZE, INITIAL_POSITION } from "../constants/actions";
import { BoatController } from "../services/boat-controller";
import CommandWindow from "../components/command-window";
import ActionView from "../components/action-view";
import ActionButton from "../components/action-button";
import ControlAreaSize from "../components/control-area-size";

const Base = () => {
    let gridItems: any[] = [];
    const [position, setPosition] = useState<TPosition>(INITIAL_POSITION);
    const [auxMovement, setAuxMovement] = useState<TPosition>(INITIAL_POSITION);
    const [viewHeightSize, setViewHeightSize] = useState<number>(INITIAL_GRID_SIZE);
    const [viewWidthSize, setViewWidthSize] = useState<number>(INITIAL_GRID_SIZE);
    gridItems = [...Array(viewWidthSize * viewHeightSize).keys()];

    const boatController = useRef(
        new BoatController(position, viewWidthSize, viewHeightSize)
    ).current;


    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAuxMovement(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAction = (funcName: TMovements) => {
        const nextPosition = boatController.handleClicked(funcName, auxMovement);
        if (funcName == 'reset') {
            setPosition(nextPosition);
            setAuxMovement(INITIAL_POSITION);
            return;
        }
        if (!boatController.movementValidation(funcName, nextPosition)) {
            return;
        }
        boatController.setPosition(nextPosition);
        setPosition(nextPosition);

        if (funcName === 'depart') {
            boatController.setDeparted(true);
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
                                boatController={boatController}
                                viewHeightSize={viewHeightSize}
                                viewWidthSize={viewWidthSize}
                                setViewHeightSize={setViewHeightSize}
                                setViewWidthSize={setViewWidthSize}
                            />
                            <div className="grid gap-8">
                                {/*  */}
                                <CommandWindow
                                    auxMovement={auxMovement}
                                    handleInputChange={handleInputChange}
                                    handleValidation={handleAction}
                                />
                                {/*  */}
                                <ActionButton
                                    handleValidation={handleAction}
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
                        boatController={boatController}
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
