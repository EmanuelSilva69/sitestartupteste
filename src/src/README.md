# Sistema de Consulta de Resultados CNU

Sistema web para consulta de resultados do Concurso Nacional Unificado (CNU).

## 🚀 Funcionalidades

- **Tela de Consulta**: Formulário para inserir número de inscrição
- **Tela de Processamento**: Loading animado durante a busca
- **Tela de Resultados**: Exibição dos resultados com três estados possíveis:
  - ✅ Sucesso (inscrição aprovada)
  - ⚠️ Não encontrado (inscrição inexistente)
  - ❌ Erro de sistema (falha de conexão)
- **Perfil Detalhado**: Visualização completa do desempenho do candidato

## 🧪 Números Mágicos para Teste

Use estes números de inscrição para testar os diferentes estados:

- `123456789012` - Resultado aprovado
- `000000000000` - Inscrição não encontrada
- `999999999999` - Erro de sistema

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (ícones)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cnu-consulta-resultados.git

# Entre na pasta do projeto
cd cnu-consulta-resultados

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 📁 Estrutura do Projeto

```
cnu-consulta-resultados/
├── src/
│   ├── components/
│   │   ├── ConsultationForm.tsx    # Formulário de consulta
│   │   ├── ProcessingScreen.tsx    # Tela de loading
│   │   ├── ResultScreen.tsx        # Tela de resultados
│   │   └── DetailedProfile.tsx     # Perfil detalhado
│   ├── imports/
│   │   ├── GeneratedDesign.tsx     # Design importado do Figma
│   │   └── svg-3vo5skaxth.ts       # Ícones SVG
│   ├── styles/
│   │   └── globals.css             # Estilos globais
│   └── App.tsx                     # Componente principal
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design

O design foi criado seguindo o Design System do Governo Federal Brasileiro (GOV.BR).

## 📝 Licença

Este projeto é um protótipo desenvolvido para fins educacionais.

## 👤 Autor

Desenvolvido com Figma Make
