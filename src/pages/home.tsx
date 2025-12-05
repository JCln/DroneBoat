import { useRef, useState } from "react";
import { USVBoat } from "../classes/usv-boat";
import { ENDirection, ENNaming, TPosition } from "../constants/enums";
import { toast } from "react-toastify";

const Home = () => {
    let gridItems: any[] = [];
    const [viewHeightSize, setViewHeightSize] = useState<number>(6);
    const [viewWidthSize, setViewWidthSize] = useState<number>(7);
    const [hasDeparted, setHasDeparted] = useState<boolean>(false)
    const boatRef = useRef(new USVBoat());
    const [position, setPosition] = useState<TPosition>({ x: 0, y: 0, direction: ENDirection.WEST });
    const [auxMovement, setAuxMovement] = useState<TPosition>(position);

    gridItems = [...Array(viewWidthSize * viewHeightSize).keys()];

    const executeCommand = () => {
        return auxMovement
    }
    const reset = () => {
        setPosition(prev => {
            return { ...prev, x: 0, y: 0, direction: ENDirection.WEST };
        })
        setHasDeparted(false);
    }
    const port = () => {
        const { x, y, direction } = position;
        switch (direction) {
            case ENDirection.NORTH:
                return { x: x, y: y, direction: ENDirection.WEST };
            case ENDirection.EAST:
                return { x: x, y: y, direction: ENDirection.NORTH };
            case ENDirection.SOUTH:
                return { x: x, y: y, direction: ENDirection.EAST };
            case ENDirection.WEST:
                return { x: x, y: y, direction: ENDirection.SOUTH };
            default:
                return position;
        }
    }
    // const status = () => {
    //     console.log(position);
    // }
    const starBoard = () => {
        const { x, y, direction } = position;
        switch (direction) {
            case ENDirection.WEST:
                return { x: x, y: y, direction: ENDirection.NORTH };
            case ENDirection.NORTH:
                return { x: x, y: y, direction: ENDirection.EAST };
            case ENDirection.EAST:
                return { x: x, y: y, direction: ENDirection.SOUTH };
            case ENDirection.SOUTH:
                return { x: x, y: y, direction: ENDirection.WEST };
            default:
                return position;
        }
    }
    const sail = () => {
        const { x, y, direction } = position;

        switch (direction) {
            case ENDirection.NORTH:
                return { x: x, y: Math.max(0, y - 1), direction: direction };
            case ENDirection.EAST:
                return { x: Math.min(100, x + 1), y: y, direction: direction };
            case ENDirection.SOUTH:
                return { x: x, y: Math.min(100, y + 1), direction: direction };
            case ENDirection.WEST:
                return { x: Math.max(0, x - 1), y: y, direction: direction };
            default:
                return position;
        }
    };
    const boatDirection = (): any => {
        const direction: ENDirection = position.direction;
        switch (direction) {
            case ENDirection.EAST:
                return 'rotate(90deg)';
            case ENDirection.NORTH:
                return 'rotate(0deg)';
            case ENDirection.WEST:
                return 'rotate(-90deg)';
            case ENDirection.SOUTH:
                return 'rotate(180deg)';
            default:
                return 'rotate(0deg)'
        }
    }
    const handleAreaWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setViewWidthSize(Number(e.target.value));
        reset();
    };
    const handleAreaHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setViewHeightSize(Number(e.target.value));
        reset();
    };
    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuxMovement(prev => ({
            ...prev,
            direction: e.target.value as ENDirection
        }));
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAuxMovement(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    }
    const handleValidation = (fn: any, item?: any) => {
        const nextPosition = fn();
        if (
            !hasDeparted
            && position.x == 0
            && position.y == 0
            && position.direction == ENDirection.WEST
            && item.target.name !== 'depart'
        ) {
            toast.error(ENNaming.boatIsStillInHarbour);
            return;
        }
        if (item?.target?.name == 'port' || item?.target?.name == 'starBoard') {
            setPosition(nextPosition);
        }
        if (nextPosition.x > -1 &&
            nextPosition.x < viewWidthSize &&
            nextPosition.y > -1 &&
            nextPosition.y < viewHeightSize) {

            setHasDeparted(true);
            setPosition(nextPosition);
        } else {
            toast.error(ENNaming.boatShouldBeInFramework);
        }
    }
    return (
        <div>
            <div className="main-wrapper">
                <h1 className="title">USV Drone Boat Simulator</h1>
                <div className="position-content grid-19-20">
                    <div className="command-section" style={{
                        minWidth: viewWidthSize + 'rem',
                        minHeight: viewHeightSize + 'rem'
                    }}>
                        <div className="" style={{ padding: '1rem' }}>
                            <div className="grid">
                                <div className="a-command-style">
                                    <div className="command-depart">
                                        <div className="input-wrapper">
                                            <div className="input-label">X</div>
                                            <input
                                                className="input-class"
                                                type="text"
                                                name="x-grid"
                                                value={viewWidthSize}
                                                onChange={handleAreaWidth}
                                            />
                                        </div>
                                        <div className="input-wrapper">
                                            <div className="input-label">Y</div>
                                            <input
                                                className="input-class"
                                                type="text"
                                                name="y-grid"
                                                value={viewHeightSize}
                                                onChange={handleAreaHeight}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                onChange={handleDirectionChange}
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
                                            onClick={(item) => handleValidation(executeCommand, item)}
                                        >
                                            Depart
                                        </button>
                                        <button
                                            className="reset-button"
                                            name="reset"
                                            onClick={reset}
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
                                        onClick={(item) => handleValidation(sail, item)}
                                    >
                                        Sail
                                    </button>
                                </div>
                                <div className="a-command-style">
                                    <div>
                                        <p>Rotate the boat 90 degrees to the <strong> Left</strong>.</p>
                                    </div>
                                    <button
                                        name='port'
                                        onClick={(item) => handleValidation(port, item)}
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
                                        onClick={(item) => handleValidation(starBoard, item)}
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
                                        transform: boatDirection()
                                    }}
                                >
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

export default Home;
