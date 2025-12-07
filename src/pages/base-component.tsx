import { useRef, useState } from "react";
import { ENDirection, ENNaming, TMovements, TPosition } from "../constants/enums";
import { toast } from "react-toastify";
import { INITIAL_GRID_SIZE, INITIAL_POSITION } from "../constants/actions";
import { BoatController } from "../services/boat-controller";
import AreaSize from "../components/area-size";

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
                            <AreaSize
                                handleAreaHeight={handleAreaHeight}
                                handleAreaWidth={handleAreaWidth}
                                viewHeightSize={viewHeightSize}
                                viewWidthSize={viewHeightSize}
                            />
                            <div className="grid gap-8">
                                <div className="a-command-style">
                                    <div>
                                        <p>Depart from the harbour and move to as position.</p>
                                    </div>
                                    <div className="command-depart">
                                        <div className="input-wrapper">
                                            <div className="input-label">X</div>
                                            <input
                                                className="input-class"
                                                type="text"
                                                name="x"
                                                value={auxMovement.x}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="input-wrapper">
                                            <div className="input-label">Y</div>
                                            <input
                                                className="input-class"
                                                type="text"
                                                name="y"
                                                value={auxMovement.y}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="input-wrapper">
                                            <div className="input-label">Direction</div>
                                            <select
                                                className="input-class"
                                                name="direction"
                                                id="direction"
                                                value={auxMovement.direction}
                                                onChange={handleInputChange}
                                            >
                                                <option value={ENDirection.NORTH}>{ENDirection.NORTH}</option>
                                                <option value={ENDirection.WEST}>{ENDirection.WEST}</option>
                                                <option value={ENDirection.SOUTH}>{ENDirection.SOUTH}</option>
                                                <option value={ENDirection.EAST}>{ENDirection.EAST}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            name="depart"
                                            onClick={(item) => handleValidation('depart', item)}
                                        >
                                            Depart
                                        </button>
                                        <button
                                            className="reset-button"
                                            name="reset"
                                            onClick={(item) => handleValidation('reset', item)}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                                <div className="a-command-style">
                                    <div>
                                        <p>Move the boat one meter forward.</p>
                                    </div>
                                    <button
                                        name="sail"
                                        onClick={(item) => handleValidation('sail', item)}
                                    >
                                        Sail
                                    </button>
                                    <button
                                        name="backward"
                                        onClick={(item) => handleValidation('backward', item)}
                                    >
                                        backward
                                    </button>
                                </div>
                                <div className="a-command-style">
                                    <div>
                                        <p>Rotate the boat 90 degrees to the <strong> Left</strong>.</p>
                                    </div>
                                    <button
                                        name='port'
                                        onClick={(item) => handleValidation('port', item)}
                                    >
                                        Port
                                    </button>
                                </div>
                                <div className="a-command-style">
                                    <div>
                                        <p>Rotate the boat 90 degrees to the <strong> Right</strong>.</p>
                                    </div>
                                    <button
                                        name="starBoard"
                                        onClick={(item) => handleValidation('starBoard', item)}
                                    >
                                        StarBoard
                                    </button>
                                </div>
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
                    <div>
                        <div className="grid justify-center">
                            <div
                                className="area-box"
                                style={{
                                    width: viewWidthSize + 'rem',
                                    height: viewHeightSize + 'rem'

                                }}
                            >
                                <div
                                    className='the-boat'
                                    style={{
                                        left: `${position.x + 'rem'}`,
                                        top: `${position.y + 'rem'}`,
                                        transform: boatDirection()
                                    }}
                                >

                                </div>
                            </div >
                            <div
                                className="area-box"
                                style={{
                                    width: viewWidthSize + 'rem',
                                    height: viewHeightSize + 'rem'

                                }}
                            >
                                <div className="grid-system">
                                    {
                                        gridItems.map((item, index) => (
                                            <div key={item + index} className="div"></div>
                                        ))
                                    }
                                    <div
                                        className='the-boat'
                                        style={{
                                            left: `${position.x + 'rem'}`,
                                            top: `${position.y + 'rem'}`,
                                            background: 'var(--color-4)',
                                            transform: boatDirection()
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="status-position">
                            <div className="status-position-style">
                                <div className="">X =</div>
                                <div className="">{position.x}</div>
                            </div>
                            <div className="status-position-style">
                                <div className="">Y =</div>
                                <div className="">{position.y}</div>
                            </div>
                            <div className="status-position-style">
                                <div className="">D =</div>
                                <div className="">{position.direction}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Base;
