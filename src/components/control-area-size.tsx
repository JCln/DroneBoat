import React from 'react'

export default function ControlAreaSize(
    { viewWidthSize,
        handleAreaWidth,
        viewHeightSize,
        handleAreaHeight }
) {
    return (
        <div className="grid">
            <div className="a-command-style">
                <div className="command-depart">
                    <div className="input-wrapper">
                        <div className="input-label">X</div>
                        <input
                            className="input-class"
                            name="x-grid"
                            type="number"
                            min="1"
                            max="40"
                            value={viewWidthSize}
                            onChange={handleAreaWidth}
                        />
                    </div>
                    <div className="input-wrapper">
                        <div className="input-label">Y</div>
                        <input
                            className="input-class"
                            type="number"
                            min="1"
                            max="40"
                            name="y-grid"
                            value={viewHeightSize}
                            onChange={handleAreaHeight}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
