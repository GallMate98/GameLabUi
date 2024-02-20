
function TicTacToeSquare({ value, row, col, onSquareClick }) {

    const handleClick = () => {
        onSquareClick(row, col);
    };

    return (
        
        <button className="w-60 h-60 border-2 border-black text-8xl font-bold text-black" onClick={handleClick}>
            {value}
        </button>
        
    );
}

export default TicTacToeSquare;
