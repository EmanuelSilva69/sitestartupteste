/**
 * SKELETON LOADER COMPONENT
 * 
 * Componente para exibir placeholders animados durante carregamento de dados.
 * Melhora perceived performance e evita layout shifts durante o loading.
 * 
 * @example
 * // Skeleton simples
 * <Skeleton className="h-4 w-[250px]" />
 * 
 * @example
 * // Card skeleton completo
 * <Card>
 *   <CardHeader>
 *     <Skeleton className="h-8 w-[200px]" />
 *     <Skeleton className="h-4 w-[150px] mt-2" />
 *   </CardHeader>
 * </Card>
 */

import * as React from "react";
import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      role="status"
      aria-label="Carregando conteúdo"
      {...props}
    />
  );
}

export { Skeleton };

/**
 * COMPONENTES DE SKELETON PRÉ-MONTADOS
 * Skeletons prontos para casos comuns de uso
 */

export function ProfileCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function QuestionCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
      <Skeleton className="h-24 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6 space-y-4">
      <Skeleton className="h-8 w-[180px]" />
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

