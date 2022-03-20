import { FunctionComponent } from 'react';

export type CellProps = {
  r: number;
  c: number;
  value: number;
  active?: boolean;
  onClick: () => void;
};

export const Cell: FunctionComponent<CellProps> = ({
  r,
  c,
  value,
  active,
  onClick,
}) => {
  return (
    <div
      className={`cell r-${r} c-${c} v-${value}${active ? ' active' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};
