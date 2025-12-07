import React from 'react'

export default function ActionButton(
    { handleValidation }
) {
    return (
        <>
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
        </>
    )
}
