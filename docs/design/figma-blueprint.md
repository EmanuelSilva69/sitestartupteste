# Figma Blueprint: Estrutura e Convenções

Este documento descreve a estrutura ideal e as convenções de nomenclatura para o arquivo Figma do projeto Startplay, garantindo consistência, escalabilidade e facilidade de colaboração entre designers e desenvolvedores.

## Estrutura de Páginas

O arquivo Figma será organizado nas seguintes páginas principais:

1.  **Capa (Cover):**
    *   Página inicial do arquivo, contendo o nome do projeto, versão, data da última atualização e links importantes (ex: link para este blueprint, link para o Storybook/documentação de componentes).
    *   Serve como um ponto de entrada claro para qualquer pessoa que acesse o arquivo.

2.  **Fluxos (Flows):**
    *   Contém diagramas de fluxo de usuário (user flows) e jornadas do usuário (user journeys).
    *   Cada fluxo deve ser claramente rotulado e mostrar as interações entre as telas e os pontos de decisão.
    *   Exemplos: "Fluxo de Início de Simulado", "Fluxo de Visualização de Resultados".

3.  **Telas (Screens):**
    *   **Simulado:** Contém todas as telas relacionadas à experiência do simulado, como a tela de personalização, a tela de questões, a tela de processamento e a tela de resultados.
    *   **Resultado:** Telas detalhadas de perfil de desempenho, gráficos e análises pós-simulado.
    *   Cada tela deve ser apresentada em seus diferentes estados (vazio, carregando, erro, sucesso, etc.).

4.  **Componentes (Components):**
    *   Biblioteca central de todos os componentes do Design System.
    *   Organizados por categoria (Base, Produto, Layouts).
    *   Cada componente deve ter suas variantes, estados e propriedades documentadas visualmente.
    *   Exemplos: Botão (Default, Hover, Disabled, Loading), Input (Default, Focus, Error), Badge (Default, Success, Warning).

5.  **Arquivo Morto (Archive):**
    *   Página para designs antigos, versões descartadas ou experimentos que não foram para produção.
    *   Ajuda a manter as páginas ativas limpas e relevantes, mas preserva o histórico de design.

## Convenção de Nomes

A consistência na nomenclatura é crucial para a organização e a busca eficiente dentro do Figma. Adotaremos o padrão:

`Contexto / Nome / Estado`

### Exemplos:

*   **Telas:**
    *   `Simulado / Personalizar / Default`
    *   `Simulado / Questão / Ativa`
    *   `Resultado / Detalhes / Carregando`

*   **Componentes:**
    *   `Botão / Primário / Default`
    *   `Botão / Primário / Hover`
    *   `Input / Texto / Default`
    *   `Input / Texto / Erro`
    *   `Badge / Disciplina / Português`
    *   `SimuladoTimer / Default / 05:00`
    *   `SimuladoTimer / Crítico / 00:30`
    *   `QuestionCard / Default / Selecionado`

### Regras Adicionais:

*   Use `/` para aninhar categorias e estados.
*   Use `CamelCase` para nomes de contexto e componentes.
*   Use `kebab-case` para estados específicos, se necessário, ou descrições curtas.
*   Mantenha os nomes concisos e descritivos.
*   Evite abreviações ambíguas.
