/*
  Source: https://feathericons.com/?query=square
  License: The MIT License (MIT)
  License URL: https://github.com/feathericons/feather/blob/main/LICENSE
*/
type ListIconProps = {
  outlineColor: string;
  width?: number;
  height?: number;
};

function ListIcon(props: ListIconProps) {
  const { outlineColor, width, height } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={outlineColor}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <line
        x1="8"
        y1="6"
        x2="21"
        y2="6"
      />
      <line
        x1="8"
        y1="12"
        x2="21"
        y2="12"
      />
      <line
        x1="8"
        y1="18"
        x2="21"
        y2="18"
      />
      <line
        x1="3"
        y1="6"
        x2="3.01"
        y2="6"
      />
      <line
        x1="3"
        y1="12"
        x2="3.01"
        y2="12"
      />
      <line
        x1="3"
        y1="18"
        x2="3.01"
        y2="18"
      />
    </svg>
  );
}

export { ListIcon };
