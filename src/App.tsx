import { FunctionComponent, useEffect, useState } from 'react';
import { Cell } from './Cell';
import { getRandomBoard, oneto9 } from './lib/sudoku';
import './styles.scss';

const App: FunctionComponent = () => {
  const [active, setActive] = useState<number>();
  const [board, setBoard] = useState<number[][]>();
  const [possibilities, setPossibilities] = useState<number[][][]>(
    new Array(9).fill(new Array(9).fill(0))
  );
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
    if (mode === 'CALCULATE') {
      // get 1 to 9 as possibilities
      const candidates = [...oneto9];

      // Eleminate all present on the row
      board![r].forEach((x) => {
        const idx = candidates.indexOf(x);
        if (idx > -1) candidates.splice(idx, 1);
      });

      // Eleminate all present on the col
      for (var i = 0; i < 9; i++) {
        const idx = candidates.indexOf(board![i][c]);
        if (idx > -1) candidates.splice(idx, 1);
      }

      // Find the box bound
      const box = [Math.ceil((r + 1) / 3), Math.ceil((c + 1) / 3)];

      // Eleminate all in the row
      for (var i = (box[0] - 1) * 3; i < box[0] * 3; i++) {
        for (var j = (box[1] - 1) * 3; j < box[1] * 3; j++) {
          const idx = candidates.indexOf(board![i][j]);
          if (idx > -1) candidates.splice(idx, 1);
        }
      }
      const p = JSON.parse(JSON.stringify(possibilities));
      p[r][c] = candidates;
      setPossibilities(p);
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
                possibilities={possibilities ? possibilities[r][i] : undefined}
              />
            ));
          })}
      </div>
    </div>
  );
};

export default App;
