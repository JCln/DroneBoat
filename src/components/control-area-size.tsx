import React, { useState } from 'react'

export default function ControlAreaSize(
    {
        boatController,
        viewHeightSize,
        viewWidthSize,
        setViewHeightSize,
        setViewWidthSize
    }
) {

    const updateGridSize = (width: number, height: number) => {
        boatController.setGridSize(width, height);
        boatController.reset();
    };

    const handleAreaHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const height = Number(e.target.value);
        setViewHeightSize(height);
        updateGridSize(viewWidthSize, height);
    };
    const handleAreaWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const width = Number(e.target.value);
        setViewWidthSize(width);
        updateGridSize(width, viewHeightSize);        
    };
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
