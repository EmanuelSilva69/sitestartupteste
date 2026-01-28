# 📋 Guia de Instalação e Upload para GitHub

## Opção 1: Exportar do Figma Make (Recomendado)

Se você estiver usando o Figma Make, procure o botão de **Export** ou **Download** na interface para baixar todo o projeto como um arquivo ZIP.

## Opção 2: Copiar Arquivos Manualmente

### Passo 1: Criar estrutura local

```bash
# Crie a pasta do projeto
mkdir cnu-consulta-resultados
cd cnu-consulta-resultados

# Crie a estrutura de pastas
mkdir -p src/components
mkdir -p src/imports
mkdir -p src/styles
mkdir -p public
```

### Passo 2: Copiar os arquivos

Você precisará copiar estes arquivos do Figma Make:

**Raiz do projeto:**
- `package.json`
- `README.md`
- `.gitignore`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`

**Pasta src/:**
- `App.tsx`

**Pasta src/components/:**
- `ConsultationForm.tsx`
- `ProcessingScreen.tsx`
- `ResultScreen.tsx`
- `DetailedProfile.tsx`

**Pasta src/imports/:**
- `GeneratedDesign.tsx`
- `svg-3vo5skaxth.ts`
- Todos os arquivos de imagem (*.png)

**Pasta src/styles/:**
- `globals.css`

### Passo 3: Instalar dependências

```bash
npm install
```

### Passo 4: Testar localmente

```bash
npm run dev
```

Abra http://localhost:5173 no navegador.

## Opção 3: Upload para GitHub

### Método A: Via Interface Web do GitHub

1. Acesse https://github.com/new
2. Crie um novo repositório chamado `cnu-consulta-resultados`
3. Clique em "uploading an existing file"
4. Arraste todos os arquivos e pastas
5. Commit as mudanças

### Método B: Via Git CLI (Linha de Comando)

```bash
# Inicialize o repositório Git
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "Initial commit: Sistema de Consulta CNU"

# Conecte ao GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/cnu-consulta-resultados.git

# Envie para o GitHub
git branch -M main
git push -u origin main
```

## Deploy Automático (Opcional)

### Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça deploy
vercel
```

### Deploy na Netlify

1. Faça push do código para o GitHub
2. Acesse https://app.netlify.com
3. Clique em "Add new site" > "Import an existing project"
4. Conecte ao seu repositório do GitHub
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🎯 Resultado

Seu projeto estará disponível em:
- **GitHub**: `https://github.com/SEU-USUARIO/cnu-consulta-resultados`
- **Vercel**: `https://cnu-consulta-resultados.vercel.app`
- **Netlify**: `https://cnu-consulta-resultados.netlify.app`

## ⚠️ Notas Importantes

1. **Imagens Figma**: Se você estiver usando imagens do Figma (`figma:asset/...`), elas só funcionarão no Figma Make. Para uso fora do Figma Make, substitua por URLs públicas ou arquivos locais.

2. **Dependências**: Certifique-se de que todas as dependências em `package.json` estejam corretas.

3. **TypeScript**: Se houver erros de tipo, você pode criar um arquivo `src/types.d.ts` para declarações customizadas.

## 🆘 Problemas Comuns

**Erro: "Cannot find module"**
```bash
npm install
```

**Erro de TypeScript**
```bash
npm install --save-dev @types/react @types/react-dom
```

**Porta já em uso**
```bash
# Use outra porta
npm run dev -- --port 3000
```
