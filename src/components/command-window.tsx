import React from 'react'
import { ENDirection } from '../constants/enums'

export default function CommandWindow(
    { handleInputChange,
        auxMovement,
        handleValidation
    }
) {
    return (
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
    )
}
