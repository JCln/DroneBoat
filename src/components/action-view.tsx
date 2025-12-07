import React from 'react'

export default function ActionView(
    {
        position,
        boatDirection,
        viewWidthSize,
        viewHeightSize,
        gridItems,
    }
) {
    return (
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
    )
}
