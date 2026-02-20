/**
 * CUSTOM HOOK: useAsync
 * 
 * Hook reutilizável para gerenciar operações assíncronas com loading, erro e data states.
 * Elimina código duplicado e simplifica tratamento de promises em componentes.
 * 
 * @example
 * const { data, loading, error, execute } = useAsync(fetchUserData);
 * 
 * <Button onClick={() => execute(userId)} disabled={loading}>
 *   {loading ? 'Carregando...' : 'Buscar'}
 * </Button>
 */

import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncReturn<T, A extends unknown[]> extends AsyncState<T> {
  execute: (...args: A) => Promise<T | undefined>;
  reset: () => void;
}

export function useAsync<T, A extends unknown[] = []>(
  asyncFunction: (...args: A) => Promise<T>
): UseAsyncReturn<T, A> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: A): Promise<T | undefined> => {
      setState({ data: null, loading: true, error: null });
      
      try {
        const data = await asyncFunction(...args);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        setState({ data: null, loading: false, error: errorObj });
        throw errorObj;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Variação do useAsync para executar imediatamente no mount
 * 
 * @example
 * const { data, loading, error } = useAsyncImmediate(() => fetchUserProfile(userId), [userId]);
 */
export function useAsyncImmediate<T>(
  asyncFunction: () => Promise<T>,
  dependencies: unknown[] = []
): Omit<UseAsyncReturn<T, []>, 'execute'> {
  const { data, loading, error, execute, reset } = useAsync(asyncFunction);

  React.useEffect(() => {
    execute();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, reset };
}

// Fix import
import React from 'react';
