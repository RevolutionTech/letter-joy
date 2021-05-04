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
      width="128"
      height="128"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="64"
        cy="64"
        r="62"
        fill={COLORS[(value - 1) % COLORS.length]}
        stroke="black"
        strokeWidth="4"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        style={{ fontSize: "72pt" }}
      >
        {value}
      </text>
    </svg>
  );
};
