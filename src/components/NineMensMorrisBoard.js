import React from 'react';

const NineMensMorrisBoard = () => {
    return (
        <div className="grid grid-cols-9 grid-rows-9 gap-2">
            {/* Első sor */}
            <div className="col-span-3 row-span-3"></div>
            <div className="col-span-3 row-span-3"></div>
            <div className="col-span-3 row-span-3"></div>

            {/* Második sor */}
            <div className="col-span-3 row-span-3"></div>
            <div className="col-span-3 row-span-3"></div>
            <div className="col-span-3 row-span-3"></div>

            {/* Harmadik sor */}
            <div className="col-span-3 row-span-3"></div>
            <div className="col-span-3 row-span-3"></div>
            <div className="col-span-3 row-span-3"></div>

            {/* Vonalak */}
            <div className="col-span-9 h-1 bg-black"></div>
            <div className="row-span-9 w-1 bg-black"></div>
        </div>
    );
};

export default NineMensMorrisBoard;