import { cn } from './utils';
import { Button } from './button';
import { TimerOff, RefreshCw, Home } from 'lucide-react';

interface ExpiredStateProps {
  title?: string;
  description?: string;
  onRestart?: () => void;
  onHome?: () => void;
  className?: string;
}

export function ExpiredState({
  title = 'Tempo Esgotado',
  description = 'O tempo disponível para este simulado acabou. Não se preocupe — você pode iniciar um novo treino quando quiser.',
  onRestart,
  onHome,
  className,
}: ExpiredStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl" />
        <div className="relative size-24 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
          <TimerOff className="size-12 text-white" strokeWidth={2} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">{description}</p>
      <div className="flex gap-3">
        {onRestart && (
          <Button onClick={onRestart} className="rounded-full px-6 gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-primary/40">
            <RefreshCw className="size-4" />
            Novo Simulado
          </Button>
        )}
        {onHome && (
          <Button variant="outline" onClick={onHome} className="rounded-full px-6 gap-2">
            <Home className="size-4" />
            Início
          </Button>
        )}
      </div>
    </div>
  );
}
