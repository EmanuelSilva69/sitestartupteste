# Dashboard de Simulados para Concursos Públicos

## Visão Geral

O Dashboard de Simulados responde visualmente a 4 perguntas-chave do concurseiro:

| Pergunta | Tela | Resposta Visual |
|---|---|---|
| **"Como fui?"** | Resultado do Simulado | Nota final em destaque + badge semáforo (verde/âmbar/vermelho) |
| **"Onde errei?"** | Detalhes da Tentativa | Grid de questões codificadas por cor (verde=acerto, vermelho=erro, âmbar=lento) |
| **"Fui lento?"** | Detalhes da Tentativa | Barras de tempo por área com badge "Lento" em âmbar/vermelho |
| **"Estou evoluindo?"** | Perfil do Concurseiro | Gráfico de evolução com indicador de tendência positiva/negativa |

## Fluxo de Navegação

```
Resultado do Simulado
  ├── Ver Detalhes do Simulado → Detalhes da Tentativa
  ├── Histórico de Simulados → Histórico de Tentativas
  │     ├── (clica num simulado) → Detalhes da Tentativa
  │     └── Ver Perfil do Concurseiro → Perfil do Concurseiro
  └── Voltar → Tela anterior (ResultScreen)
```

## Sistema de Cores (Semáforo)

Utilizamos o sistema de semáforo para comunicação visual imediata:

- **Verde (Emerald):** Acerto, Aprovado, pontos fortes, tendência positiva
- **Âmbar (Amber/Amarelo):** Abaixo da meta, lento, precisa de atenção
- **Vermelho (Red):** Erro, desempenho crítico, tendência negativa
- **Roxo (Primary):** Neutro/destaque para informações principais

## Telas Exportadas

Os PNGs das 4 telas principais foram salvos em `docs/design/exports/`:

- `docs/design/exports/01-tela-resultado.png`
- `docs/design/exports/02-tela-historico.png`
- `docs/design/exports/03-tela-detalhe-tentativa.png`
- `docs/design/exports/04-tela-perfil-concurseiro.png`

## Protótipo Navegável

O protótipo funcional pode ser acessado via ambiente de desenvolvimento local:

```bash
npm run dev
# Acessar http://localhost:3000
# Inserir CPF: 123456789012
# Clicar em "Analisar Desempenho Detalhado" para acessar o dashboard
```

## Script de Exportação Automática

Para gerar os PNGs automaticamente:

```bash
# Instalar Puppeteer (caso não esteja instalado)
npm install --save-dev puppeteer

# Iniciar servidor em background
npm run dev &

# Executar script de exportação
node scripts/export-screenshots.mjs
```

## Estrutura de Arquivos

```
src/
  screens/dashboard/
    DashboardContainer.tsx    # Container de navegação entre telas
    ResultadoSimulado.tsx     # Tela 1: Resultado do Simulado
    HistoricoTentativas.tsx   # Tela 2: Histórico de Tentativas
    DetalheTentativa.tsx      # Tela 3: Detalhes da Tentativa
    PerfilConcurseiro.tsx     # Tela 4: Perfil/Status do Concurseiro
  types/
    dashboard.ts              # Tipos do dashboard
  data/
    mockDashboard.ts          # Dados mock para demonstração
scripts/
  export-screenshots.mjs      # Script Puppeteer para exportar PNGs
docs/
  design/exports/             # PNGs exportados
```
