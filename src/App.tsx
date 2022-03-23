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
      if (n) setActive(n);
      else {
        const b = JSON.parse(JSON.stringify(board));
        b[r][c] = active;
        setBoard(b);
      }
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
        <h1 className="logo">
          <span>Du</span>
          <span>So</span>
          <span>Ku</span>
        </h1>
        <div className="mode">
          <button
            className={mode === 'SELECT' ? 'active' : ''}
            onClick={() => setMode('SELECT')}
          >
            <i className="fa-regular fa-circle-check"></i> Sel
          </button>
          <button
            className={mode === 'REMOVE' ? 'active remove' : ''}
            onClick={() => setMode('REMOVE')}
          >
            <i className="fa fa-trash-can"></i> Rem
          </button>
          <button
            className={mode === 'CALCULATE' ? 'active calculate' : ''}
            onClick={() => setMode('CALCULATE')}
          >
            <i className="fa-regular fa-lightbulb"></i> Calc
          </button>
        </div>
        <button onClick={() => setBoard(getRandomBoard())}>
          <i className="fa-regular fa-share-from-square"></i> Reload
        </button>
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
      <div className="number-select">
        {oneto9.map((n) => (
          <button
            className={`number-select__btn${active === n ? ' active' : ''}`}
            onClick={() => setActive(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
