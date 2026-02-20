/**
 * MIGRATION HELPER
 * Script para ajudar na migração de componentes para o sistema de temas
 */

// ============================================
// 1. REGRAS DE CONVERSÃO AUTOMÁTICA
// ============================================

export const migrationRules: Record<string, string> = {
  // Backgrounds
  'bg-purple-600': 'bg-primary',
  'bg-purple-500': 'bg-primary',
  'bg-purple-700': 'bg-primary/90',
  'bg-pink-500': 'bg-secondary',
  'bg-pink-600': 'bg-secondary/90',
  'bg-blue-500': 'bg-accent',
  'bg-blue-600': 'bg-accent/90',
  'bg-white': 'bg-background',
  'bg-gray-900': 'bg-card',
  'bg-gray-100': 'bg-muted',
  'bg-gray-50': 'bg-muted/50',
  'bg-red-600': 'bg-destructive',
  'bg-emerald-500': 'bg-success',
  'bg-yellow-500': 'bg-warning',

  // Text colors
  'text-purple-600': 'text-primary',
  'text-pink-500': 'text-secondary',
  'text-blue-500': 'text-accent',
  'text-white': 'text-primary-foreground',
  'text-black': 'text-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-gray-700': 'text-foreground',
  'text-gray-900': 'text-foreground',

  // Borders
  'border-purple-600': 'border-primary',
  'border-gray-300': 'border-border',
  'border-gray-200': 'border-border',
  'border-gray-700': 'border-border',

  // Rings (focus states)
  'ring-purple-600': 'ring-primary',
  'ring-purple-500': 'ring-primary',
  'ring-blue-500': 'ring-accent',

  // Dark mode variants (remover duplicações)
  'dark:bg-gray-900': '', // removido pois bg-card já é responsivo
  'dark:bg-gray-800': '',
  'dark:text-white': '',
  'dark:text-gray-400': '',
  'dark:border-gray-700': '',
};

// ============================================
// 2. EXEMPLO REAL: ConsultationForm ANTES
// ============================================

export const consultationFormBefore = `
<div className="bg-gradient-to-r from-primary to-secondary shadow-2xl">
  <div className="p-8">
    <h1 className="text-4xl font-bold text-white">
      Startplay Simulados
    </h1>
    <p className="text-white/90">Portal de Desempenho</p>
  </div>
  
  <Card className="shadow-2xl border-0 bg-card/95">
    <div className="p-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Iniciar Consulta
      </h2>
      
      <Button className="bg-gradient-to-r from-primary to-secondary text-white">
        Consultar Resultado
      </Button>
    </div>
  </Card>
</div>
`;

// ============================================
// 3. EXEMPLO REAL: ConsultationForm DEPOIS
// ============================================

export const consultationFormAfter = `
<div className="bg-primary border-b">
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-primary-foreground">
      Startplay Simulados
    </h1>
    <p className="text-primary-foreground/80">Portal de Desempenho</p>
  </div>
  
  <Card className="border shadow-sm">
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-foreground">
        Iniciar Consulta
      </h2>
      
      <Button>
        Consultar Resultado
      </Button>
    </div>
  </Card>
</div>
`;

// ============================================
// 4. CHECKLIST DE MIGRAÇÃO POR COMPONENTE
// ============================================

export interface ComponentMigrationChecklist {
  componentName: string;
  status: 'pending' | 'in-progress' | 'completed';
  tasks: {
    description: string;
    done: boolean;
  }[];
}

export const migrationChecklist: ComponentMigrationChecklist[] = [
  {
    componentName: 'ConsultationForm.tsx',
    status: 'pending',
    tasks: [
      { description: 'Remover gradientes do header', done: false },
      { description: 'Substituir bg-purple-600 por bg-primary', done: false },
      { description: 'Substituir text-white por text-primary-foreground', done: false },
      { description: 'Simplificar shadow-2xl para shadow-sm', done: false },
      { description: 'Remover bg-gradient-to-r dos botões', done: false },
      { description: 'Usar componente Button sem override de cores', done: false },
    ],
  },
  {
    componentName: 'ResultScreen.tsx',
    status: 'pending',
    tasks: [
      { description: 'Remover gradientes do header', done: false },
      { description: 'Substituir cores hardcoded por tokens', done: false },
      { description: 'Remover efeitos blur excessivos', done: false },
      { description: 'Simplificar cards de sucesso/erro', done: false },
      { description: 'Usar badges semânticos', done: false },
    ],
  },
  {
    componentName: 'DetailedProfile.tsx',
    status: 'pending',
    tasks: [
      { description: 'Substituir cores hardcoded', done: false },
      { description: 'Usar tokens para gráficos', done: false },
      { description: 'Aplicar tokens em badges/estatísticas', done: false },
    ],
  },
  // Adicione outros componentes conforme necessário
];

// ============================================
// 5. FUNÇÃO UTILITÁRIA PARA CONVERSÃO
// ============================================

/**
 * Converte classes antigas para o novo sistema
 * (Use com cautela - requer revisão manual)
 */
export function convertClassNames(oldClasses: string): string {
  let result = oldClasses;

  // Aplica cada regra de migração
  Object.entries(migrationRules).forEach(([old, newClass]) => {
    const regex = new RegExp(`\\b${old}\\b`, 'g');
    result = result.replace(regex, newClass);
  });

  // Remove classes vazias
  result = result
    .split(' ')
    .filter(c => c.trim() !== '')
    .join(' ');

  return result;
}

// ============================================
// 6. COMPARAÇÃO: ANTES vs DEPOIS
// ============================================

export const migrationExamples = {
  simpleButton: {
    before: 'bg-purple-600 text-white hover:bg-purple-700 rounded-full',
    after: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-full',
    explanation: 'Usa tokens semânticos que se adaptam ao tema',
  },

  card: {
    before: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700',
    after: 'bg-card border-border',
    explanation: 'Reduz complexidade e remove dark: variants redundantes',
  },

  header: {
    before: 'bg-gradient-to-r from-primary to-secondary shadow-2xl',
    after: 'bg-primary border-b',
    explanation: 'Simplifica para design mais clean, mantém funcionalidade',
  },

  text: {
    before: 'text-gray-600 dark:text-gray-400',
    after: 'text-muted-foreground',
    explanation: 'Token semântico único para ambos os modos',
  },

  badge: {
    before: 'bg-emerald-500 text-white rounded-full px-4 py-2',
    after: 'bg-success text-success-foreground rounded-full px-4 py-2',
    explanation: 'Usa tokens de cores semânticas',
  },
};

// ============================================
// 7. TEMPLATE PARA NOVOS COMPONENTES
// ============================================

export const componentTemplate = `
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header com tema */}
      <header className="bg-primary border-b">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-semibold text-primary-foreground">
            {title}
          </h1>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-6 py-12">
        <Card className="border shadow-sm">
          <div className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Seção
            </h2>
            <p className="text-muted-foreground mb-6">
              Descrição usando token semântico
            </p>
            
            <Button onClick={onAction}>
              Ação Principal
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
`;

// ============================================
// 8. VALIDAÇÃO DE MIGRAÇÃO
// ============================================

/**
 * Verifica se um componente ainda tem cores hardcoded
 */
export function validateComponent(code: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Verifica cores hexadecimais
  const hexColorRegex = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g;
  const hexColors = code.match(hexColorRegex);
  if (hexColors) {
    issues.push(`Encontradas ${hexColors.length} cores hexadecimais hardcoded`);
    suggestions.push('Substitua cores hexadecimais por tokens semânticos');
  }

  // Verifica uso de Tailwind com cores específicas
  const tailwindColorRegex = /(bg|text|border)-(purple|pink|blue|gray)-\d{3}/g;
  const tailwindColors = code.match(tailwindColorRegex);
  if (tailwindColors) {
    issues.push(`Encontradas ${tailwindColors.length} classes Tailwind com cores específicas`);
    suggestions.push('Use tokens como bg-primary, text-foreground, etc.');
  }

  // Verifica dark mode manual
  const darkModeRegex = /dark:[a-z-]+/g;
  const darkModes = code.match(darkModeRegex);
  if (darkModes && darkModes.length > 0) {
    issues.push(`Encontradas ${darkModes.length} classes dark: manuais`);
    suggestions.push('Tokens semânticos já são responsivos ao tema');
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions,
  };
}

// ============================================
// 9. EXPORTAR RELATÓRIO DE MIGRAÇÃO
// ============================================

export function generateMigrationReport(): string {
  const pending = migrationChecklist.filter(c => c.status === 'pending').length;
  const inProgress = migrationChecklist.filter(c => c.status === 'in-progress').length;
  const completed = migrationChecklist.filter(c => c.status === 'completed').length;

  return `
📊 RELATÓRIO DE MIGRAÇÃO
========================

Status dos Componentes:
- ⏳ Pendentes: ${pending}
- 🔄 Em progresso: ${inProgress}
- ✅ Concluídos: ${completed}

Total: ${migrationChecklist.length} componentes

Próximos Passos:
${migrationChecklist
  .filter(c => c.status === 'pending')
  .map(c => `  - ${c.componentName}`)
  .join('\n')}
  `;
}
