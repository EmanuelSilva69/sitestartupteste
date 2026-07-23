import { useEffect, useState } from 'react';
import { cn } from './utils';
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineStateProps {
  className?: string;
  onRetry?: () => void;
}

export function OfflineState({ className, onRetry }: OfflineStateProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="size-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
        <WifiOff className="size-10 text-amber-500" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">Sem Conexão</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
        Você está offline. Verifique sua conexão com a internet e tente novamente.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all text-sm font-semibold"
        >
          <RefreshCw className="size-4" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
