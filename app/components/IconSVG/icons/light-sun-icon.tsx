/*
  Source: https://feathericons.com/?query=dark
  License: The MIT License (MIT)
  License URL: https://github.com/feathericons/feather/blob/main/LICENSE
*/

type LightSunIconProps = {
  outlineColor: string;
  width?: number;
  height?: number;
};

function LightSunIcon(props: LightSunIconProps) {
  const { outlineColor = '#FFFFFF', width = 30, height = 30 } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={outlineColor}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <circle
        cx="12"
        cy="12"
        r="5"
      />
      <line
        x1="12"
        y1="1"
        x2="12"
        y2="3"
      />
      <line
        x1="12"
        y1="21"
        x2="12"
        y2="23"
      />
      <line
        x1="4.22"
        y1="4.22"
        x2="5.64"
        y2="5.64"
      />
      <line
        x1="18.36"
        y1="18.36"
        x2="19.78"
        y2="19.78"
      />
      <line
        x1="1"
        y1="12"
        x2="3"
        y2="12"
      />
      <line
        x1="21"
        y1="12"
        x2="23"
        y2="12"
      />
      <line
        x1="4.22"
        y1="19.78"
        x2="5.64"
        y2="18.36"
      />
      <line
        x1="18.36"
        y1="5.64"
        x2="19.78"
        y2="4.22"
      />
    </svg>
  );
}

export { LightSunIcon };
