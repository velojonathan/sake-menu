import { cn } from '@/lib/utils';

interface FlavorTagBadgeProps {
  name: string;
  size?: 'sm' | 'md';
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export default function FlavorTagBadge({
  name,
  size = 'sm',
  interactive = false,
  selected = false,
  onClick,
}: FlavorTagBadgeProps) {
  const baseClasses = cn(
    'badge-flavor capitalize',
    size === 'md' && 'px-3 py-1.5 text-sm',
    interactive && 'cursor-pointer transition-colors',
    selected && 'bg-secondary text-on-secondary'
  );

  if (interactive) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {name}
      </button>
    );
  }

  return <span className={baseClasses}>{name}</span>;
}
