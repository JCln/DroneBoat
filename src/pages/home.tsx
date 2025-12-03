import { useRef, useState } from "react";
import { USVBoat } from "../classes/usv-boat";
import { ENDirection, TPosition } from "../constants/enums";

const Home = () => {
    const areaWidth = 5;
    const areaHeight = 5;
    const [auxMovement, setAuxMovement] = useState<TPosition>({ x: 0, y: 0, direction: ENDirection.WEST });
    const boatRef = useRef(new USVBoat());
    const [position, setPosition] = useState<TPosition>({ x: 0, y: 0, direction: ENDirection.WEST });

    const executeCommand = () => {
        // console.log('Selected Direction:', position);
        // const temp = boatRef.current.depart(position);
        // console.log(temp);        
        setPosition(auxMovement);

    }
    const port = () => {
        setPosition(prev => {
            const { x, y, direction } = prev;
            switch (direction) {
                case ENDirection.NORTH:
                    return { ...prev, direction: ENDirection.WEST };
                case ENDirection.EAST:
                    return { ...prev, direction: ENDirection.NORTH };
                case ENDirection.SOUTH:
                    return { ...prev, direction: ENDirection.EAST };
                case ENDirection.WEST:
                    return { ...prev, direction: ENDirection.SOUTH };
                default:
                    return prev;
            }
        })
    }
    const status = () => {
        console.log(position);

    }
    const starBoard = () => {
        setPosition(prev => {
            const { x, y, direction } = prev;
            switch (direction) {
                case ENDirection.WEST:
                    return { ...prev, direction: ENDirection.NORTH };
                case ENDirection.NORTH:
                    return { ...prev, direction: ENDirection.EAST };
                case ENDirection.EAST:
                    return { ...prev, direction: ENDirection.SOUTH };
                case ENDirection.SOUTH:
                    return { ...prev, direction: ENDirection.WEST };
                default:
                    return prev;
            }
        })
    }
    const sail = () => {
        setPosition(prev => {
            const { x, y, direction } = prev;

            switch (direction) {
                case ENDirection.NORTH:
                    return { ...prev, y: Math.max(0, y - 1) };
                case ENDirection.EAST:
                    return { ...prev, x: Math.min(100, x + 1) };
                case ENDirection.SOUTH:
                    return { ...prev, y: Math.min(100, y + 1) };
                case ENDirection.WEST:
                    return { ...prev, x: Math.max(0, x - 1) };
                default:
                    return prev;
            }
        });
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAuxMovement(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };
    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuxMovement(prev => ({
            ...prev,
            direction: e.target.value as ENDirection
        }));
    };
    return (
        <div>
            <h1 className="title">USV Drone Boat Simulator</h1>
            <div className="main-wrapper grid-19-20">
                <div className="command-section" style={{
                    minWidth: areaWidth * 5 + 'rem',
                    minHeight: areaHeight * 5 + 'rem'
                }}>
                    <div className="" style={{ padding: '1rem' }}>
                        <div className="grid gap-8">
                            <div className="a-command-style">
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
                                    <button
                                        onClick={executeCommand}
                                    >
                                        execute
                                    </button>
                                </div>
                            </div>
                            <div className="a-command-style">
                                <div>
                                    <p>Move the boat one meter forward</p>
                                </div>
                                <button
                                    onClick={sail}
                                >
                                    sail
                                </button>
                            </div>
                            <div className="a-command-style">
                                <div>
                                    <p>rotate the boat 90 degrees to the <strong> Left</strong></p>
                                </div>
                                <button
                                    onClick={port}
                                >
                                    port
                                </button>
                            </div>
                            <div className="a-command-style">
                                <div>
                                    <p>rotate the boat 90 degrees to the <strong> Right</strong></p>
                                </div>
                                <button
                                    onClick={starBoard}
                                >
                                    starBoard
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
                <div className="grid">
                    <div
                        className="area-box"
                        style={{
                            width: areaWidth * 5 + 'rem',
                            height: areaHeight * 5 + 'rem'

                        }}
                    >
                        <div
                            className='the-boat'
                            style={{
                                left: `${position.x + 'vw'}`,
                                top: `${position.y + 'vh'}`,
                                transform: boatDirection()
                            }}
                        >

                        </div>
                    </div >
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
                            <div className="">Direction =</div>
                            <div className="">{position.direction}</div>
                        </div>

                    </div>
                </div>
            </div >
        </div>
    );
};

export default Home;
