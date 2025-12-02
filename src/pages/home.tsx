import { useRef, useState } from "react";
import { USVBoat } from "../classes/usv-boat";

const Home = () => {
    const [movement, setMovement] = useState<any>()
    const boatRef = useRef(new USVBoat());
    console.log(boatRef.current);

    const testCommands = [
        // Test 1: Basic movement
        {
            name: "Basic Navigation",
            commands: [
                "DEPART 0 0 NORTH",
                "STATUS", // Expected: 0,0,NORTH
                "SAIL",
                "STATUS", // Expected: 0,1,NORTH
                "STARBOARD",
                "SAIL",
                "STATUS" // Expected: 1,1,EAST
            ]
        },
    ]
    const executeCommand = () => {
        console.log(boatRef.current);
        console.log(boatRef.current.status());
    }

    return (
        <>
            <div className="">
                <h1>USV Drone Boat Simulator</h1>
                <input
                    type="text"
                    value={movement}
                />
                <button
                    title="hi"
                    onClick={executeCommand}
                    value={'hi'}>
                    execute
                </button>

            </div >
            <div className="area-box">
                <div className={`the-boat`}>

                </div>
            </div>
        </>
    );
};

export default Home;
