import { PlaneIcon } from './icons';

export default function BotAvatar({ size = 'default' }) {
  const dimension = size === 'small' ? 'h-6 w-6' : 'h-8 w-8';
  const iconSize = size === 'small' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div
      className={`flex ${dimension} flex-none items-center justify-center rounded-full bg-ink ring-1 ring-amber-400/30`}
    >
      <PlaneIcon className={`${iconSize} text-amber-400`} />
    </div>
  );
}
