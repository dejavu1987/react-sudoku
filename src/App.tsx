import { FunctionComponent, useState } from "react";
import "./styles.scss";

type Seed = number[];

type CellProps = {
  r: number;
  c: number;
  value: number;
  active?: boolean;
  onClick: () => void;
};

const one29 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const seed = one29.sort(() => Math.random() - 0.5);

const Cell: FunctionComponent<CellProps> = ({
  r,
  c,
  value,
  active,
  onClick
}) => {
  return (
    <div
      className={`cell r-${r} c-${c} v-${value}${active ? " active" : ""}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

const rotateRow = (seed: Seed, index: number) => {
  var rowData = [...seed];
  const moved = rowData.splice(0, index);
  rowData = [...rowData, ...moved];
  return rowData;
};

const getRow = (seed: Seed, row: number) => {
  if (row === 1) return seed;
  if (row === 2) {
    return rotateRow(seed, 3);
  }
  if (row === 3) {
    return rotateRow(seed, 6);
  }
  if (row === 4) {
    return rotateRow(seed, 7);
  }
  if (row === 5) {
    return rotateRow(seed, 1);
  }
  if (row === 6) {
    return rotateRow(seed, 4);
  }
  if (row === 7) {
    return rotateRow(seed, 5);
  }
  if (row === 8) {
    return rotateRow(seed, 8);
  }
  if (row === 9) {
    return rotateRow(seed, 2);
  }
  return seed;
};

const App: FunctionComponent = () => {
  const [active, setActive] = useState<number>();

  const onCellClick = (n: number) => {
    setActive(n);
  };
  return (
    <div className="App">
      <h1>DuSoKu</h1>
      <div className="board">
        {one29.map((r) => {
          return getRow(seed, r).map((n, i) => (
            <Cell
              key={`${r}-${i + 1}`}
              r={r}
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
