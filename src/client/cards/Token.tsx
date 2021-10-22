const COLORS = [
  "#D16666",
  "#D18D66",
  "#CFD166",
  "#82D166",
  "#66D1CB",
  "#669ED1",
  "#8866D1",
  "#D166BA",
];

interface Props {
  value: number;
}

export const Token = (props: Props) => {
  const { value } = props;
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32"
        cy="32"
        r="31"
        fill={COLORS[(value - 1) % COLORS.length]}
        stroke="black"
        strokeWidth="2"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        style={{ fontSize: "36pt" }}
      >
        {value}
      </text>
    </svg>
  );
};
