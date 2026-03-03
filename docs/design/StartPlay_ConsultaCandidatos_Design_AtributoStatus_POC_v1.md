# Sistema de Atributos RPG - Status do Concurseiro
## Documentação Técnica do Motor de Métricas

---

## 📋 Visão Geral

O sistema de atributos do Startplay transforma dados brutos de telemetria em métricas gamificadas que refletem o desempenho e evolução do concurseiro. Cada atributo possui uma definição clara, widget de visualização e dados de telemetria necessários para seu cálculo.

---

## 📊 Tabela de Atributos - MVP (Prioridade 1)

| # | Nome | Definição | Widget | Telemetria Necessária | Fórmula | Ícone |
|---|------|-----------|--------|----------------------|---------|-------|
| 1 | **Precisão** | Taxa de acerto global (% de respostas corretas). Mede competência técnica. | Radar Chart + Card | `is_correct`, `total_attempts` | `(correct_answers / total_answers) * 100` | 🎯 Target |
| 2 | **Velocidade** | Tempo médio para responder uma questão (inverso: mais rápido = melhor). | Radar Chart + Card | `time_start`, `time_end`, `question_count` | `100 - min((avg_time / max_time) * 100, 100)` | ⚡ Gauge |
| 3 | **Consistência** | Dias seguidos estudando (Streak). Mede comprometimento. | Radar Chart + Card | `login_date`, `study_session_date` | `min((streak_days / 30) * 100, 100)` | 🔥 Flame |
| 4 | **Resistência** | Tempo contínuo em sessão sem pausas/saídas (em horas). | Radar Chart + Card | `session_start`, `session_pause`, `session_end` | `min((max_session_hours / 8) * 100, 100)` | 🔋 Battery |
| 5 | **Cobertura** | Percentual do edital/conteúdo visualizado. Mede amplitude. | Radar Chart + Card | `total_topics`, `topics_studied` | `(topics_studied / total_topics) * 100` | 🗺️ Map |

---

## 📚 Tabela de Atributos - Backlog (Futuro)

| # | Nome | Definição | Widget | Telemetria Necessária |
|---|------|-----------|--------|----------------------|
| 6 | **Frieza** | Performance sob pressão (% acerto em simulados com timer) | Termômetro Visual | `is_timed_mode`, `time_remaining`, `is_correct` |
| 7 | **Foco** | Concentração (intrupções de aba / desvios calculados) | Gráfico de Linha | `tab_switches`, `session_duration`, `distraction_events` |
| 8 | **Adaptabilidade** | Taxa de melhoria entre tentativas (delta de acertos) | Trending Up Icon | `attempt_number`, `score_attempt_n`, `score_attempt_n-1` |
| 9 | **Especialização** | Profundidade em um tema específico | Expertise Badge | `topic_id`, `correct_answers_per_topic`, `difficulty_per_topic` |
| 10 | **Momentum** | Tendência recente de performance (últimas 7 questões) | Mini Gráfico | `recent_7_answers`, `timestamp` |

---

## 🎮 Níveis do Usuário (Gamificação)

O nível do usuário é calculado pela soma ponderada dos 5 atributos do MVP:

```
Score Total = (Precisão × 0.30) + (Velocidade × 0.20) + (Consistência × 0.20) + (Resistência × 0.15) + (Cobertura × 0.15)

Nível = floor(Score Total / 10)
```

### Títulos por Nível (Exemplos)

| Nível | Faixa de Score | Título | Descrição |
|-------|----------------|---------|-|
| 1-3 | 0-30 | Aprendiz | Começou sua jornada |
| 4-6 | 31-60 | Estudioso | Pegando ritmo |
| 7-9 | 61-80 | Estrategista | Dominando técnicas |
| 10-12 | 81-95 | Guerreiro | Pronto para qualquer desafio |
| 13+ | 96-100 | Campeão | Elite absoluta |

---

## 📡 Telemetria Necessária (Captura de Dados)

### Eventos Obrigatórios para MVP

#### 1. **question_answered**
```json
{
  "event_type": "question_answered",
  "user_id": "uuid",
  "question_id": "uuid",
  "selected_alternative": "A|B|C|D|E",
  "is_correct": boolean,
  "time_spent_seconds": number,
  "difficulty_level": "easy|medium|hard",
  "topic_id": "uuid",
  "attempt_number": number,
  "timestamp": "ISO8601",
  "session_id": "uuid"
}
```

#### 2. **session_started**
```json
{
  "event_type": "session_started",
  "user_id": "uuid",
  "session_id": "uuid",
  "mode": "training|simulation|review",
  "timestamp": "ISO8601"
}
```

#### 3. **session_ended**
```json
{
  "event_type": "session_ended",
  "user_id": "uuid",
  "session_id": "uuid",
  "duration_seconds": number,
  "questions_answered": number,
  "correct_answers": number,
  "timestamp": "ISO8601"
}
```

#### 4. **user_login**
```json
{
  "event_type": "user_login",
  "user_id": "uuid",
  "timestamp": "ISO8601"
}
```

---

## 🛠️ Implementação Técnica

### Estrutura de Dados (TypeScript)

```typescript
interface UserAttributes {
  precisao: number;           // 0-100
  velocidade: number;         // 0-100 (inversa ao tempo)
  consistencia: number;       // 0-100 (dias streak)
  resistencia: number;        // 0-100 (tempo em minutos)
  cobertura: number;          // 0-100 (% de topics)
  nivel: number;              // Calculado
  titulo: string;             // Calculado
  ultimaAtualizacao: Date;
}

interface TelemetryEvent {
  event_type: string;
  user_id: string;
  timestamp: Date;
  data: Record<string, any>;
}
```

### Cálculos de Atributos

#### Precisão
```typescript
const precisao = (correctAnswers / totalAnswers) * 100;
```

#### Velocidade
```typescript
const tempoMedioSegundos = totalTimeSpent / questionCount;
const velocidade = Math.max(0, 100 - (tempoMedioSegundos / 120) * 100); // 120s = base
```

#### Consistência (Streak)
```typescript
const streak = calculateConsecutiveDays(loginDates);
const consistencia = Math.min(100, (streak / 30) * 100); // 30 dias = 100
```

#### Resistência
```typescript
const maxSessionMinutes = calculateLongestSession(sessionData);
const resistencia = Math.min(100, (maxSessionMinutes / 180) * 100); // 180 min = 100
```

#### Cobertura
```typescript
const cobertura = (topicsStudied / totalTopics) * 100;
```

#### Nível e Título
```typescript
const scoreTotal = 
  (precisao * 0.30) +
  (velocidade * 0.20) +
  (consistencia * 0.20) +
  (resistencia * 0.15) +
  (cobertura * 0.15);

const nivel = Math.floor(scoreTotal / 10);
const titulo = getTituloByNivel(nivel);
```

---

## 📈 Dashboard de Visualização

### Gráfico de Radar (Spider Chart)
- 5 eixos: Precisão, Velocidade, Consistência, Resistência, Cobertura
- Cores: Primária (#8b5cf6) para ativo, Muted para inativo
- Animação ao carregar
- Tooltips informativos

### Cards de Atributos
Cada atributo deve ter seu próprio card com:
- **Ícone**: Representação visual do atributo
- **Valor Numérico**: 0-100 com unidade
- **Barra de Progresso**: Visual horizontal
- **Tendência**: ↑ melhora, ↓ piora, → estável
- **Label**: Nome e breve descrição

### Ícones Sugeridos (Lucide React)
| Atributo | Ícone |
|----------|-------|
| Precisão | `Target` ou `Bullseye` |
| Velocidade | `Zap` ou `Gauge` |
| Consistência | `Flame` ou `Calendar` |
| Resistência | `Battery` ou `Dumbbell` |
| Cobertura | `Map` ou `BookOpen` |

---

## 🔄 Atualização de Dados

- **Tempo Real**: Após cada questão respondida
- **Cache**: Atualizar a cada 5 minutos durante sessão ativa
- **Persistência**: Salvar telemetria em banco de dados
- **Sync**: Validação cruzada a cada logout

---

## 🎯 KPIs de Sucesso

- [ ] 80%+ das questões respondidas têm telemetria completa
- [ ] Cálculos de atributos são atualizados <5s após resposta
- [ ] UI de radar carrega em <500ms
- [ ] Precisão do cálculo de streak é 100% (sem bugs)
- [ ] Engajamento aumenta 25%+ ao visualizar o perfil com atributos

---

## 📝 Próximos Passos

1. Implementar telemetria no `SimulationRunnerScreen`
2. Criar serviço de cálculo de atributos
3. Integrar banco de dados (Firebase/Supabase)
4. Testes unitários para cada fórmula
5. A/B testing com usuários
