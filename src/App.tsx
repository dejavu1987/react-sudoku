import { FunctionComponent, useState } from "react";
import { Cell } from "./Cell";
import { getRandomBoard } from "./lib/sudoku";
import "./styles.scss";

const board = getRandomBoard();

const App: FunctionComponent = () => {
  const [active, setActive] = useState<number>();
  const [mode, setMode] = useState<"SELECT" | "REMOVE" | "CALCULATE">("SELECT");

  const onCellClick = (n: number) => {
    setActive(n);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>DuSoKu</h1>
        <div className="mode">
          <button
            className={mode === "SELECT" ? "active" : ""}
            onClick={() => setMode("SELECT")}
          >
            S
          </button>
          <button
            className={mode === "REMOVE" ? "active" : ""}
            onClick={() => setMode("REMOVE")}
          >
            X
          </button>
          <button
            className={mode === "CALCULATE" ? "active" : ""}
            onClick={() => setMode("CALCULATE")}
          >
            Q
          </button>
        </div>
      </header>
      <div className="board">
        {board.map((row, r) => {
          return row.map((n, i) => (
            <Cell
              key={`${r + 1}-${i + 1}`}
              r={r + 1}
              c={i + 1}
              value={n}
              active={active === n}
              onClick={() => onCellClick(n)}
            />
          ));
        })}
      </div>
    </div>
  );
};

export default App;
