type DocumentIconProps = {
  outlineColor?: string;
  fillColor?: string;
  width?: number;
  height?: number;
};

function DocumentIcon(props: DocumentIconProps) {
  const {
    fillColor = '#FFFFFF',
    outlineColor = '#FFFFFF',
    width = 30,
    height = 30,
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 43"
      fill={fillColor}
      stroke={outlineColor}
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.5 10.6195H12.5C11.6359 10.6195 10.9375 11.2142 10.9375 11.9469C10.9375 12.681 11.6359 13.2743 12.5 13.2743H37.5C38.3641 13.2743 39.0625 12.681 39.0625 11.9469C39.0625 11.2142 38.3641 10.6195 37.5 10.6195ZM46.875 37.1681C46.875 38.627 45.1781 39.8389 43.464 39.8389H6.20937C4.49531 39.8389 3.10469 38.6575 3.10469 37.1987V5.52876C3.10469 4.06991 4.53438 2.65487 6.25 2.65487H43.75C45.4656 2.65487 46.875 3.85221 46.875 5.30973V37.1681ZM43.75 0H6.25C2.82188 0 0 2.61372 0 5.52876V37.1987C0 40.115 2.77969 42.4779 6.20937 42.4779H43.464C46.8937 42.4779 50 40.0832 50 37.1681V5.30973C50 2.39469 47.1781 0 43.75 0ZM37.5 26.5487H12.5C11.6359 26.5487 10.9375 27.1434 10.9375 27.8761C10.9375 28.6102 11.6359 29.2035 12.5 29.2035H37.5C38.3641 29.2035 39.0625 28.6102 39.0625 27.8761C39.0625 27.1434 38.3641 26.5487 37.5 26.5487ZM37.5 18.5841H12.5C11.6359 18.5841 10.9375 19.1788 10.9375 19.9115C10.9375 20.6456 11.6359 21.2389 12.5 21.2389H37.5C38.3641 21.2389 39.0625 20.6456 39.0625 19.9115C39.0625 19.1788 38.3641 18.5841 37.5 18.5841Z"
      />
    </svg>
  );
}

export { DocumentIcon };
