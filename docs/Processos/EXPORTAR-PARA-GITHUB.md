# 🚀 Como Exportar Este Projeto para o GitHub

## ✅ TODOS OS ARQUIVOS JÁ ESTÃO PRONTOS!

Este projeto já está completo e pronto para ser exportado.

## 📦 Opção 1: Exportar do Figma Make (MAIS FÁCIL)

Se você estiver no Figma Make:

1. Procure o botão **"Export"** ou **"Download"** na interface
2. Baixe o arquivo ZIP completo
3. Extraia o ZIP no seu computador
4. Pule para a seção "Upload para GitHub" abaixo

## 📋 Opção 2: Lista de Arquivos para Copiar Manualmente

Se não houver opção de export, você precisa copiar estes arquivos:

### ✅ Arquivos de Configuração (Raiz)
- `package.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `index.html`
- `.gitignore`
- `README.md`
- `INSTALL.md`
- `ARQUIVOS.md`
- `EXPORTAR-PARA-GITHUB.md`

### ✅ Código Fonte (pasta src/)
- `src/main.tsx`
- `src/App.tsx`

### ✅ Componentes (pasta src/components/)
- `src/components/ConsultationForm.tsx`
- `src/components/ProcessingScreen.tsx`
- `src/components/ResultScreen.tsx`
- `src/components/DetailedProfile.tsx`

### ✅ Imports do Figma (pasta src/imports/)
- `src/imports/GeneratedDesign.tsx`
- `src/imports/svg-3vo5skaxth.ts`

### ✅ Estilos (pasta src/styles/)
- `src/styles/globals.css`

### ⚠️ Imagens
As imagens com `figma:asset/` precisam ser substituídas:
- Baixe a logo GOV.BR manualmente
- Salve em `public/govbr-logo.png`
- Substitua todas as referências `figma:asset/0b3edc4f7257e9376d9a28a57d620b0c4246fe9b.png` por `/govbr-logo.png`

## 🌐 Upload para GitHub

### Método A: Interface Web (Iniciante)

1. **Crie um repositório no GitHub:**
   - Vá para https://github.com/new
   - Nome: `cnu-consulta-resultados`
   - Descrição: "Sistema de Consulta de Resultados do CNU"
   - Público ou Privado (sua escolha)
   - **NÃO marque** "Add a README file"
   - Clique em "Create repository"

2. **Upload dos arquivos:**
   - Na página do repositório criado, clique em "uploading an existing file"
   - Arraste TODA a pasta do projeto
   - Ou selecione todos os arquivos manualmente
   - Adicione uma mensagem: "Initial commit: Sistema CNU"
   - Clique em "Commit changes"

### Método B: Git via Terminal (Avançado)

```bash
# 1. Navegue até a pasta do projeto
cd caminho/para/cnu-consulta-resultados

# 2. Inicialize o Git
git init

# 3. Adicione todos os arquivos
git add .

# 4. Faça o primeiro commit
git commit -m "Initial commit: Sistema de Consulta CNU"

# 5. Adicione o repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/cnu-consulta-resultados.git

# 6. Crie a branch main e faça push
git branch -M main
git push -u origin main
```

## 🚀 Deploy Online (Opcional mas Recomendado)

### Deploy na Vercel (Grátis)

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `cnu-consulta-resultados`
5. Clique em "Deploy"
6. Aguarde 2-3 minutos
7. Seu site estará online! 🎉

### Deploy na Netlify (Grátis)

1. Acesse https://app.netlify.com
2. Faça login com GitHub
3. Clique em "Add new site" → "Import an existing project"
4. Selecione o repositório
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Clique em "Deploy"

## 🧪 Testar Localmente Antes do Deploy

```bash
# 1. Navegue até a pasta
cd cnu-consulta-resultados

# 2. Instale as dependências
npm install

# 3. Execute o projeto
npm run dev

# 4. Abra no navegador
# http://localhost:5173
```

## 📝 Checklist Final

- [ ] Todos os arquivos copiados
- [ ] Logo GOV.BR substituída (ou referências removidas)
- [ ] `npm install` executado com sucesso
- [ ] `npm run dev` funciona localmente
- [ ] Repositório criado no GitHub
- [ ] Código enviado para o GitHub
- [ ] Deploy feito (Vercel/Netlify)
- [ ] README.md atualizado com link do deploy

## 🎯 URLs Finais

Após o deploy, você terá:

- **Repositório**: `https://github.com/SEU-USUARIO/cnu-consulta-resultados`
- **Site Online**: `https://cnu-consulta-resultados.vercel.app` (ou .netlify.app)

## 💡 Dicas

1. **Atualize o README** com o link do site online
2. **Adicione screenshots** do projeto no README
3. **Configure o GitHub Pages** como alternativa de deploy
4. **Compartilhe** o link do projeto!

## 🆘 Problemas?

**Erro ao instalar dependências:**
```bash
npm cache clean --force
npm install
```

**Erro de TypeScript:**
```bash
npm install --save-dev @types/react @types/react-dom
```

**Imagens não aparecem:**
- Verifique se substituiu `figma:asset/` por caminhos reais
- Coloque as imagens na pasta `public/`

## 📧 Suporte

Para mais ajuda, consulte:
- INSTALL.md (instruções detalhadas)
- ARQUIVOS.md (lista completa de arquivos)
- README.md (documentação do projeto)

---

✨ **Pronto!** Seu projeto estará no GitHub e online em poucos minutos!
