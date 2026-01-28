import React from 'react';
import { cn } from './utils';

interface ProgressProps {
  value: number;
  showLabel?: boolean;
  className?: string;
}

export function Progress({ value, showLabel = false, className }: ProgressProps) {
  // Garantir que o valor esteja entre 0 e 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Progresso
          </span>
          <span className="text-sm font-black text-primary">
            {clampedValue}%
          </span>
        </div>
      )}
      <div className="h-3 w-full bg-secondary/20 rounded-full overflow-hidden border border-border/50">
        <div
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(158,127,255,0.4)]"
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
