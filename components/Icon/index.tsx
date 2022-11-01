import ICON_LIST, { IconName } from "./icons-list";

const SIZE = 25;

const sizing: Record<Sizes, string> = {
  xs: `${SIZE * 0.65}px`,
  sm: `${SIZE * 0.92}px`,
  md: `${SIZE * 1}px`,
  lg: `${SIZE * 1.2}px`,
  xl: `${SIZE * 1.4}px`,
  '2xl': `${SIZE * 2.4}px`,
  '2xs': `${SIZE * 3}px`,
};

type Sizes = '2xs'|'xs'|'sm'|'md'|'lg'|'xl'|'2xl'

export interface IconComponent {
  name: IconName;
  size?: Sizes;
}


export default function Icon({ name = 'gear', size = 'md', ...rest }: IconComponent) {
  const Icon = ICON_LIST[name];

  if (Icon) {
    return <Icon size={sizing[size]} {...rest} />;
  } else {
    return <span className="text-[10px] italic">Icon:{name}</span>;
  }
}

