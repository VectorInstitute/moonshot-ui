import { Icon, IconName } from './IconSVG';

type IconButtonProps = {
  iconName: IconName;
  iconSize?: number;
  label?: string;
  disabled?: boolean;
  onClick: () => void;
};

function IconButton(props: IconButtonProps) {
  const { iconName, label, disabled, iconSize = 11, onClick } = props;
  return (
    <button
      disabled={disabled}
      className="h-6 py-0 px-[7px] text-xs text-white
      disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-fuchsia-900/30 disabled:text-white/70
      bg-fuchsia-900/80 hover:bg-fuchsia-900/50 active:bg-fuchsia-900
      dark:bg-sky-700 dark:hover:bg-sky-800 dark:active:bg-sky-600 btn-small rounded-none flex items-center gap-2"
      type="button"
      onClick={onClick}>
      <Icon
        name={iconName}
        lightModeColor="#FFFFFF"
        size={iconSize}
      />
      {label !== undefined ? <div className="mb-[2px]">{label}</div> : null}
    </button>
  );
}

export { IconButton };
