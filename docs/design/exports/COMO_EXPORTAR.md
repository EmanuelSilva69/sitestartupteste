# 📸 Guia de Exportação de Screenshots para Figma

## 📂 Estrutura de Pastas

Salve os prints nesta estrutura:

```
docs/design/exports/
├── screens/
│   ├── 01-login-vazio.png
│   ├── 02-login-preenchido.png
│   ├── 03-personalizar-cnu.png
│   ├── 04-runner-questao-ativa.png
│   ├── 05-runner-mapa-badges.png
│   ├── 06-review-lista.png
│   ├── 07-processing-loading.png
│   ├── 08-resultado-grafico.png
│   └── 09-perfil-radar.png
├── components/
│   ├── button-default.png
│   ├── button-loading.png
│   ├── input-erro.png
│   ├── timer-critico.png
│   └── question-navigator.png
└── flows/
    └── fluxo-completo.png (opcional)
```

---

## 🎨 Como Criar o Protótipo Navegável no Figma

### **Passo 1: Criar Arquivo Figma**

1. Acesse [figma.com](https://figma.com)
2. Clique em **"New Design File"**
3. Renomeie para: **"Consultadecandidatos - POC CNU"**

---

### **Passo 2: Organizar Páginas**

Crie estas páginas no Figma (painel esquerdo):

1. **📄 Capa**
   - Título: "Consultadecandidatos - POC CNU"
   - Versão: "Sprint 1 - Protótipo Navegável"
   - Data: "30/01/2026"

2. **🎬 Fluxos**
   - Diagrama visual do fluxo completo
   - Setas conectando: Login → Personalizar → Runner → Review → Processing → Resultado → Perfil

3. **📱 Telas**
   - Aqui você vai importar os screenshots

4. **🧩 Componentes**
   - Prints dos componentes individuais (Button, Input, etc.)

---

### **Passo 3: Importar Screenshots**

**Na página "Telas":**

1. Arraste cada PNG da pasta `exports/screens/` para o Figma
2. Organize em ordem do fluxo (esquerda → direita)
3. Nomeie cada Frame:
   - `Tela / Login / Vazio`
   - `Tela / Personalizar / CNU`
   - `Tela / Runner / Ativa`
   - `Tela / Review / Lista`
   - `Tela / Processing / Loading`
   - `Tela / Resultado / Gráfico`
   - `Tela / Perfil / Radar`

---

### **Passo 4: Criar Protótipo Navegável**

**Ativar Modo Prototype:**

1. No canto superior direito, clique em **"Prototype"** (ícone de play)

2. **Conectar os fluxos:**

   - **Tela Login** → clique no botão "Consultar"
     - Arraste seta azul para → **Tela Personalizar**
     - Interaction: "On Click" → "Navigate to" → Personalizar
     - Animation: "Instant" ou "Smart Animate"

   - **Tela Personalizar** → clique no botão "Começar"
     - Conectar para → **Tela Runner**

   - **Tela Runner** → clique no botão "Revisar"
     - Conectar para → **Tela Review**

   - **Tela Review** → clique em "Finalizar Simulado"
     - Conectar para → **Tela Processing**

   - **Tela Processing** (após 3 segundos)
     - Interaction: "After Delay" (3000ms)
     - Navigate to → **Tela Resultado**

   - **Tela Resultado** → clique em "Ver Perfil Detalhado"
     - Conectar para → **Tela Perfil**

   - **Tela Perfil** → botão "Voltar"
     - Conectar para → **Tela Resultado**

3. **Definir Starting Frame:**
   - Clique na primeira tela (Login)
   - No painel direito, marque ⭐ **"Set as starting frame"**

---

### **Passo 5: Testar Navegação**

1. Clique no botão **▶️ "Present"** (canto superior direito)
2. Teste o fluxo clicando nos botões
3. Verifique se todas as transições funcionam
4. Pressione `ESC` para sair do modo apresentação

---

### **Passo 6: Gerar Link Público**

1. Clique em **"Share"** (canto superior direito)
2. Em "Get link", configure:
   - ✅ **"Anyone with the link can view"**
   - Selecione: **"Prototype/Present"** (não "Edit")
3. Clique em **"Copy link"**

**O link terá este formato:**
```
https://www.figma.com/proto/ABC123XYZ/Consultadecandidatos?node-id=1-2&...
```

4. Cole este link em:
   - `docs/design/PROTOTYPE_LINKS.md` (criar este arquivo)
   - Comentário do Jira

---

## 📝 Atalhos Úteis no Figma

| Ação | Atalho |
|------|--------|
| Modo Prototype | `Shift + E` |
| Apresentar | `Ctrl + Alt + Enter` |
| Duplicar Frame | `Ctrl + D` |
| Zoom para Fit | `Shift + 1` |
| Conectar Frames | Arrastar do círculo azul → outro frame |

---

## ✅ Checklist Final

Antes de gerar o link, verifique:

- [ ] Todas as 7-9 telas importadas
- [ ] Frames nomeados corretamente (`Tela / Nome / Estado`)
- [ ] Conexões de navegação criadas
- [ ] Starting frame definido (Login)
- [ ] Testado no modo Present
- [ ] Link público gerado
- [ ] Modo "Prototype/Present" ativado (não "Edit")
- [ ] Link copiado para PROTOTYPE_LINKS.md

---

## 🎯 Entrega para o Jira

**Copie este texto para o card do Jira:**

```markdown
## ✅ Protótipo Figma Navegável - COMPLETO

**Link do Protótipo:**
[COLAR LINK AQUI]

**Como Testar:**
1. Clique no link acima
2. Pressione `Space` ou clique na seta → para navegar
3. Fluxo: Login → Personalizar (CNU) → Runner → Review → Processing → Resultado → Perfil

**Telas Implementadas:** 7-9 telas completas
**Estados:** Loading, Erro, Empty implementados
**CNU:** ✅ Único concurso visível na POC
```

---

**🚀 Pronto! Agora você tem um protótipo navegável completo para apresentar no Jira.**
