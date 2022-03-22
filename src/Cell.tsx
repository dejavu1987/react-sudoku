import { FunctionComponent } from 'react';

export type CellProps = {
  r: number;
  c: number;
  value: number;
  active?: boolean;
  onClick: () => void;
  possibilities?: number[];
};

export const Cell: FunctionComponent<CellProps> = ({
  r,
  c,
  value,
  active,
  onClick,
  possibilities,
}) => {
  return (
    <div
      className={`cell r-${r} c-${c} v-${value}${active ? ' active' : ''}`}
      onClick={onClick}
    >
      {value ? <span className="value">{value}</span> : ''}
      <div className="candidates">
        {!value && possibilities
          ? possibilities.map((p) => {
              return <span>{p}</span>;
            })
          : ''}
      </div>
    </div>
  );
};
