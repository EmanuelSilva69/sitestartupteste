/**
 * EXEMPLO DE COMPONENTE REFATORADO
 * Demonstra como criar componentes agnósticos ao tema usando design tokens
 */

import React from 'react';
import { Search, Sparkles, User } from 'lucide-react';
import { Card } from './card';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';

// ============================================
// ANTES (Hardcoded styles)
// ============================================
/*
export function OldButton() {
  return (
    <button 
      className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-8 py-4"
    >
      Click me
    </button>
  );
}
*/

// ============================================
// DEPOIS (Using design tokens)
// ============================================

/**
 * Exemplo 1: Botão usando tokens semânticos
 * Agora este componente se adapta automaticamente ao tema
 */
export function ThemedButton({ children }: { children: React.ReactNode }) {
  return (
    <Button 
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {children}
    </Button>
  );
}

/**
 * Exemplo 2: Card usando system design tokens
 * Note como não há valores hardcoded
 */
export function ThemedCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}

/**
 * Exemplo 3: Input field agnóstico ao tema
 */
export function ThemedInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input 
        className="h-12 bg-input-background border-input text-foreground focus:border-primary focus:ring-primary/20"
        {...props}
      />
    </div>
  );
}

/**
 * Exemplo 4: Status Badge com variantes semânticas
 */
type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

const badgeStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
  error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100',
  info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100',
};

export function ThemedBadge({ 
  variant = 'info', 
  children 
}: { 
  variant?: BadgeVariant; 
  children: React.ReactNode 
}) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badgeStyles[variant]}`}>
      {children}
    </span>
  );
}

/**
 * Exemplo 5: Formulário completo usando design tokens
 */
interface ThemedFormProps {
  onSubmit: (value: string) => void;
}

export function ThemedForm({ onSubmit }: ThemedFormProps) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header semântico */}
      <header className="bg-primary border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Sparkles className="size-6 text-primary-foreground" />
            <h1 className="text-2xl font-semibold text-primary-foreground">
              Sistema Themable
            </h1>
          </div>
        </div>
      </header>

      {/* Content usando tokens */}
      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <Card className="border shadow-sm">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Exemplo de Formulário
              </h2>
              <p className="text-muted-foreground text-sm">
                Este formulário se adapta automaticamente ao tema
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <ThemedInput
                label="Campo de Exemplo"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Digite algo..."
              />

              <ThemedButton>
                <Search className="size-4 mr-2" />
                Consultar
              </ThemedButton>
            </form>

            {/* Info card com tokens */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium text-sm text-foreground mb-3">
                Sobre este exemplo
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Usa apenas tokens semânticos (bg-primary, text-foreground, etc.)</li>
                <li>• Não possui cores hardcoded</li>
                <li>• Adapta-se automaticamente a todos os temas</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

// ============================================
// GUIA RÁPIDO DE MIGRAÇÃO
// ============================================

/*
ANTES → DEPOIS (Guia de Conversão)

🎨 CORES:
  #8b5cf6        → bg-primary
  #ec4899        → bg-secondary
  #3b82f6        → bg-accent
  #ffffff        → bg-background (light) / text-foreground (dark)
  #000000        → bg-background (dark) / text-foreground (light)
  
📦 BACKGROUNDS:
  bg-purple-600  → bg-primary
  bg-pink-500    → bg-secondary
  bg-gray-100    → bg-muted
  bg-white       → bg-background ou bg-card
  
✏️ TEXTOS:
  text-purple-600 → text-primary
  text-white      → text-primary-foreground (em bg-primary)
  text-gray-600   → text-muted-foreground
  text-black      → text-foreground
  
🔲 BORDAS:
  border-purple-600 → border-primary
  border-gray-300   → border-border
  
🔘 INPUTS:
  bg-gray-100    → bg-input-background
  border-gray-300 → border-input
  focus:ring-purple-500 → focus:ring-primary
  
REGRA DE OURO:
Se você está usando um valor hexadecimal (#) ou nome de cor (purple-600),
substitua por um token semântico!
*/
