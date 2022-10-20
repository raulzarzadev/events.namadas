import ICON_LIST, { IconName } from "./icons-list";

type Sizes = '2xs'|'sm'|'md'|'lg'|'xl'|'2xl'

export interface IconComponent {
  name: IconName;
  size?: Sizes;
}


export default function Icon({ name = 'gear', size = 'md', ...rest }: IconComponent) {
  const Icon = ICON_LIST[name];

  if (Icon) {
    return <Icon size={sizign[size]} {...rest} />;
  } else {
    return <span className="text-[10px] italic">Icon:{name}</span>;
  }
}

const SIZE = 25;

const sizign:Record<string, string> = {
  xs: `${SIZE * 0.85}px`,
  sm: `${SIZE * 0.92}px`,
  md: `${SIZE * 1}px`,
  lg: `${SIZE * 1.2}px`,
  xl: `${SIZE * 1.4}px`,
};
