
import TicTacToeSquare from "./TicTacToeSquare";

function BoardTicTacToe({ onSquareClick,  boardState}) {

    const renderSquare = (row, col) => {
        const value = boardState[row][col];
        const index = row * 3 + col;
        return (
            <TicTacToeSquare
                key={index}
                value={value}
                onSquareClick={() =>  onSquareClick(row, col)}
            />
        );
    };

    const renderRow = (row) => {
        return (
            <div className="mb-[-2px] flex flex-row gap-0" key={row}>
                {[0, 1, 2].map((col) => renderSquare(row, col))}
            </div>
        );
    };

    return (
        <div className="">
            {[0, 1, 2].map((row) => renderRow(row))}
        </div>
    );
}

export default BoardTicTacToe;
