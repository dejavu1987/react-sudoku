import { FunctionComponent, useEffect, useState } from 'react';
import { Cell } from './Cell';
import { getRandomBoard } from './lib/sudoku';
import './styles.scss';

const App: FunctionComponent = () => {
  const [active, setActive] = useState<number>();
  const [board, setBoard] = useState<number[][]>();
  const [mode, setMode] = useState<'SELECT' | 'REMOVE' | 'CALCULATE'>('SELECT');

  useEffect(() => {
    setBoard(getRandomBoard());
  }, []);
  const onCellClick = (n: number, r: number, c: number) => {
    if (mode === 'SELECT') {
      setActive(n);
    }
    if (mode === 'REMOVE') {
      const b = JSON.parse(JSON.stringify(board));
      b[r][c] = 0;
      setBoard(b);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>DuSoKu</h1>
        <div className="mode">
          <button
            className={mode === 'SELECT' ? 'active' : ''}
            onClick={() => setMode('SELECT')}
          >
            Sel
          </button>
          <button
            className={mode === 'REMOVE' ? 'active' : ''}
            onClick={() => setMode('REMOVE')}
          >
            Rem
          </button>
          <button
            className={mode === 'CALCULATE' ? 'active' : ''}
            onClick={() => setMode('CALCULATE')}
          >
            Q
          </button>
        </div>
        <button onClick={() => setBoard(getRandomBoard())}>Reload</button>
      </header>
      <div className="board">
        {board &&
          board.map((row, r) => {
            return row.map((n, i) => (
              <Cell
                key={`${r + 1}-${i + 1}`}
                r={r + 1}
                c={i + 1}
                value={n}
                active={active === n}
                onClick={() => onCellClick(n, r, i)}
              />
            ));
          })}
      </div>
    </div>
  );
};

export default App;
