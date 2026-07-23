import React from 'react';
import { cn } from './utils';
import { Button } from './button';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className
      )}
    >
      <div className="size-20 rounded-3xl bg-muted/50 border border-border/50 flex items-center justify-center mb-6">
        {icon ?? <Inbox className="size-10 text-muted-foreground/40" />}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="rounded-full px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
