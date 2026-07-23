import { cn } from './utils';
import { Button } from './button';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  errorMessage?: string;
  retryLabel?: string;
  onRetry?: () => void;
  backLabel?: string;
  onBack?: () => void;
  className?: string;
}

export function ErrorState({
  icon,
  title,
  description,
  errorMessage,
  retryLabel = 'Tentar novamente',
  onRetry,
  backLabel = 'Voltar',
  onBack,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full blur-2xl" />
        <div className="relative size-24 rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
          {icon ?? <AlertTriangle className="size-12 text-white" strokeWidth={2} />}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-base text-muted-foreground max-w-md mb-2 leading-relaxed">{description}</p>
      {errorMessage && (
        <div className="px-4 py-2 rounded-xl bg-muted/50 border border-border mb-6 max-w-md w-full">
          <p className="text-xs text-muted-foreground font-mono truncate">{errorMessage}</p>
        </div>
      )}
      <div className="flex gap-3 mt-2">
        {onBack && (
          <Button variant="outline" onClick={onBack} className="rounded-full px-6 gap-2">
            <ArrowLeft className="size-4" />
            {backLabel}
          </Button>
        )}
        {onRetry && (
          <Button onClick={onRetry} className="rounded-full px-6 gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-primary/40">
            <RefreshCw className="size-4" />
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
