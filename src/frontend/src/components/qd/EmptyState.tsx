import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  imageSrc?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  imageSrc
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {imageSrc ? (
        <img src={imageSrc} alt={title} className="w-64 h-64 object-contain mb-6 opacity-80" />
      ) : Icon ? (
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Icon className="w-12 h-12 text-muted-foreground" />
        </div>
      ) : null}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
