import { FunctionComponent, useState } from 'react';
import { Cell } from './Cell';
import { getRandomBoard, getRandomSeed, getRow, oneto9 } from './lib/sudoku';
import './styles.scss';

const board = getRandomBoard();

const App: FunctionComponent = () => {
  const [active, setActive] = useState<number>();

  const onCellClick = (n: number) => {
    setActive(n);
  };

  return (
    <div className="App">
      <h1>DuSoKu</h1>
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
