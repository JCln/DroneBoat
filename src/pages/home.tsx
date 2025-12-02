import { useRef, useState } from "react";
import { USVBoat } from "../classes/usv-boat";
import { ENDirection, TPosition } from "../constants/enums";

const Home = () => {
    const [movement, setMovement] = useState<any>()
    const boatRef = useRef(new USVBoat());
    const [position, setPosition] = useState<TPosition>({ x: 0, y: 0, direction: ENDirection.WEST });

    const executeCommand = () => {
        console.log('Selected Direction:', position);
        const temp = boatRef.current.depart(position);
        console.log(temp);
        
    }
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

        setPosition(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };
    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosition(prev => ({
            ...prev,
            direction: e.target.value as ENDirection
        }));
    };
    return (
        <div>
            <h1 className="title">USV Drone Boat Simulator</h1>
            <div className="main-wrapper grid-19-20">
                <div className="command-section">
                    <div className="command-depart">
                        <div className="input-wrapper">
                            <div className="input-label">X</div>
                            <input
                                className="input-class"
                                type="text"
                                name="x"
                                value={position.x}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <div className="input-label">Y</div>
                            <input
                                className="input-class"
                                type="text"
                                name="y"
                                value={position.y}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <div className="input-label">Direction</div>
                            <select
                                className="input-class"
                                name="direction"
                                id="direction"
                                value={position.direction}
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

                </div >
                <div className="area-box">
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
            </div >
        </div>
    );
};

export default Home;
