# VIVA+ — Relatório de Análise Completa e Plano de Continuação
> ⚠️ Nome em colisão: um documento interno do projeto chama este app de "NEXEN" ("nome histórico: Viva+"). Isso é diferente do outro projeto do usuário, que também se chama NEXEN (super-app de igreja/loja). Até decidir o nome final, este documento trata este app como **VIVA+** para não misturar com o outro.

---

## 1. O que é o VIVA+

App de **transformação de hábitos, saúde integral e desenvolvimento pessoal**. Está sendo **reconstruído do zero** — o projeto anterior (mesmo código-base) foi descartado por acumular **72 defeitos auditados**, todos derivados de 6 causas-raiz de governança (não de falta de capacidade técnica).

**Regra de reaproveitamento:** o código antigo não pode ser usado como base direta. Só podem ser reaproveitados requisitos, textos, identidade visual e regras de negócio já confirmadas.

---

## 2. Onde a reconstrução parou (estado real no disco)

```
Módulo corrente:     0 (Contrato e Repositório)
Bloco corrente:      0.2-FIX — concluído com ressalva
Próximo bloco:       diagnóstico do npm ci (comando pronto, não executado)
Bloqueio ativo:      npm ci retorna erro; mensagem foi engolida por --silent
```

- `.npmrc` (config antiga de pnpm) → removido
- `package.json` existe (nome `viva-tmp`, versão `0.0.0`)
- `package-lock.json` existe (lockfileVersion 3)
- `node_modules/` com 26 entradas — **isso é normal**, não é sinal de pnpm (é Vite 8 + Rolldown, que usa binários Rust no lugar de centenas de pacotes JS)
- Blocos 0.3 a 0.13 → **não executados ainda**

### 🔴 Bloqueio imediato a resolver primeiro

O `npm ci` falhou mas a saída de erro foi suprimida por `--silent` num pipe, então não dá pra saber a causa ainda. **Primeiro comando a rodar na próxima sessão:**

```bash
set +e
echo "=== npm ci, full output ==="
npm ci
echo "EXIT=$?"
set -e

echo "=== node -v / npm -v ==="
node -v; npm -v
echo "=== package.json deps vs lock ==="
node -e "const p=require('./package.json');console.log(JSON.stringify({deps:p.dependencies,dev:p.devDependencies},null,2))"
echo "=== lock packages count ==="
node -e "const l=require('./package-lock.json');console.log('entries:',Object.keys(l.packages||{}).length)"
```

**Hipótese mais provável:** `package.json` e `package-lock.json` ficaram dessincronizados pelo `mv` da pasta temporária no Bloco 0.2-FIX. Se confirmado:
- `package.json and package-lock.json are not in sync` → rodar `npm install` e depois `npm ci`
- `EUSAGE` ou lock desatualizado → `rm package-lock.json && npm install && npm ci`
- Erro de rede → repetir o comando
- Qualquer outro → levar a saída completa para análise antes de tentar corrigir

---

## 3. Stack definitiva (decidida e travada)

**Permitido:**
- Runtime: Node 20, npm (nunca bun/yarn/pnpm)
- Frontend: React + TypeScript + Vite
- Estilo: Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- Roteamento: react-router-dom
- Validação: zod
- Ícones: lucide-react
- Backend: **Supabase é o único backend** (sem Express/Next.js)
- Cliente: `@supabase/supabase-js`
- Testes JS: vitest + @testing-library
- Testes SQL: pgTAP

**Proibido:** Flutter, Dart, Express, Next.js, `@google/genai` (sem IA antes do Módulo 12), Docker (Replit não oferece), bun, yarn, pnpm.

---

## 4. As 12 regras anti-repetição (colar no início de toda sessão com qualquer agente)

```
R-01  NUNCA mostrar dado inventado como se viesse do banco. Sem conexão real,
      mostrar o estado de erro real. Mocks só em src/tests/.
R-02  NUNCA converter falha em sucesso (catch vazio, catch retornando "ok",
      default mascarando dado ausente, dependência opcional fingindo funcionar).
R-03  NUNCA colar um resumo no lugar da saída do terminal. Se rodou, colar
      todas as linhas. Se não rodou, dizer que não rodou.
R-04  NUNCA usar --silent ou pipe antes de ler $?. $? depois de um pipeline
      é o status do ÚLTIMO comando, não do primeiro.
R-05  NUNCA rodar um scaffolder interativo contra "." — sempre numa
      subpasta vazia, depois mover pra raiz.
R-06  NUNCA deixar config de outro gerenciador de pacotes pra trás
      (.npmrc, .yarnrc, .yarnrc.yml, .pnpmfile.cjs, pnpm-workspace.yaml).
R-07  NUNCA fixar versão de pacote na mão — deixar o npm resolver.
R-08  NUNCA usar allowedHosts: true (exposição a DNS rebinding).
R-09  NUNCA criar policy de RLS para service_role (ele ignora RLS; a
      policy nunca executa — usar apenas grant).
R-10  NUNCA criar tabela própria de schema_migrations — o Supabase já
      mantém supabase_migrations.schema_migrations.
R-11  NUNCA usar \i dentro de migration nem mudar schema pelo SQL Editor —
      sempre migration file + `npx supabase db push`. SQL Editor só lê.
R-12  NUNCA colocar token de admin no repositório. sbp_ = Personal Access
      Token = ADMIN, nunca vai ao cliente. Valores reais só em Replit Secrets.

Quando um guard falhar: corrigir o CÓDIGO, nunca o guard. Um guard só
muda através de um novo ADR em docs/DECISIONS.md.
```

---

## 5. Roteiro completo de módulos (0 a 13)

### Fase 1 — Fundação (bloqueia todo o resto)

| Módulo | Nome | Prova de vida obrigatória | Estado |
|---|---|---|---|
| 0 | Contrato e Repositório | `verify.sh` retorna EXIT=0 e INTACT | **Em andamento — travado no npm ci** |
| 1 | Esqueleto React | build passa, teste passa, HTTP 200 | Pendente |
| 2 | Fundação Supabase | 3 tabelas, RLS ativa, 8 flags, anon bloqueado em audit_logs | Pendente |
| 3 | **Conexão Real (PORTÃO)** | UPDATE de flag no banco muda a tela sem redeploy | Pendente |

⚠️ **Módulo 3 é o portão crítico.** Nenhum módulo de negócio pode começar antes dele passar. A prova: mudar uma feature flag direto no Supabase e ver a tela mudar sem tocar em código — se não mudar, é sinal de simulação (o mesmo erro que matou o projeto anterior).

### Fase 2 — Núcleo do produto

| Módulo | Nome | Tabelas criadas | Prova de vida |
|---|---|---|---|
| 4 | Autenticação e Perfis | `profiles` | signup cria linha; RLS isola usuários |
| 5 | Hábitos | `habits`, `habit_records` | usuário A não lê hábito de usuário B |
| 6 | Jornadas | `journeys`, `journey_habits`, `user_journeys` | cálculo de progresso correto |
| 7 | Desafios | `challenges`, `challenge_participants` | prazo e meta funcionam |

**O MVP tecnicamente está pronto ao terminar o Módulo 8** (Desafios e dashboard).

### Fase 3 — Expansão

| Módulo | Nome | Depende de | Observação |
|---|---|---|---|
| 8 | Desafios e dashboard | 7 | Estabilização do MVP |
| 9 | Administração | 4 | papéis, flags, auditoria, moderação |
| 10 | Comunidade | 5 | publicações, comentários, reações, denúncias |
| 11 | Loja | 4 | produtos, pedidos, regras comerciais |
| 12 | Pagamentos | 10/11 | só depois da loja definida |
| 13 | IA Viva+ | 5, 6 | requer finalidade definida, política de privacidade, limites de dados sensíveis (LGPD art. 11), backend seguro, orçamento aprovado |
| — | PWA e Mobile | 5 | manifest, service worker, offline, Capacitor |

**Estimativa de sessões:** Fundação (4-6), Núcleo (8-12), Expansão (12-20). Um módulo por sessão.

---

## 6. Ciclo obrigatório dentro de cada módulo

```
1. Ler docs/STATE.md               → onde estamos
2. Rodar verify.sh                 → estado íntegro? Falhou → PARAR
3. Executar os blocos              → só o que foi enviado
4. Rodar verify.sh novamente       → TODOS os guards, não só os novos
5. Executar a prova de vida        → colar saída REAL
6. Revisão e aprovação
7. Selar: STATE.md + MODULES.json + commit
8. ENCERRAR A SESSÃO               → um módulo por sessão
```

O passo 4 é o que impede quebra silenciosa entre módulos: não basta o módulo novo funcionar, os anteriores precisam continuar funcionando.

---

## 7. Catálogo resumido de erros já mapeados (não repetir)

| Erro | Causa | Regra que bloqueia |
|---|---|---|
| Duas stacks incompatíveis (React na raiz + Flutter em `apps/mobile/`) | Nenhuma decisão de stack registrada | `docs/ARCHITECTURE.md` lista dependências proibidas; `check-stack.sh` falha o build |
| **Simulação apresentada como app real** (status "Conectado" fixo em HTML, feature flags em array, health check com `setTimeout`) | Nenhuma prova de execução era exigida | R-01 + prova de vida do Módulo 3 |
| Quebra silenciosa (`StartupController` sem dependência obrigatória, retornava "ready" mesmo sem funcionar) | Fallback silencioso permitido | R-02 |
| Testes pgTAP falhando (extensão não criada na migration) | Perda de contexto entre sessões | `docs/STATE.md` reescrito ao fim de cada módulo |
| Token de admin documentado como chave pública | Ninguém classificou os tipos de chave | `docs/SECURITY.md` + `check-secrets.sh` bloqueia `sbp_`, `sb_secret_`, JWT literal |
| RLS ativa sem nenhuma policy (`admin_audit_logs` ficou inutilizável) | Confusão entre "proteger" e "tornar inacessível" | Classificação de exposição em `MODULES.json` |
| Script pedindo Docker no Replit | Limitações do ambiente não documentadas | `docs/PROJECT.md` declara "sem Docker, sem Postgres local" |

Chaves Supabase — nunca vai ao frontend: `service_role` (eyJ...), `sb_secret_...`, `sbp_...` (Personal Access Token). Só vão ao frontend: chave anônima (`eyJ...` role anon) e `sb_publishable_...`.

---

## 8. Próximos passos imediatos (em ordem)

1. **Rodar o diagnóstico do `npm ci`** (comando da seção 2) e corrigir conforme o erro real aparecer.
2. **Fechar o Módulo 0** — rodar 0.3 a 0.13 na sequência (dependências → estrutura de pastas → docs PROJECT/ARCHITECTURE/SECURITY → MODULES.json/STATE.md/DECISIONS.md → guards → configuração → scripts → app mínimo → Supabase CLI init + Git → prova de vida `verify.sh` EXIT=0 → teste negativo dos guards).
3. **Módulo 1 — Esqueleto React**: build passando, HTTP 200, testes básicos.
4. **Módulo 2 — Fundação Supabase**: criar `app_settings`, `feature_flags`, `admin_audit_logs`, com RLS e migrations.
5. **Módulo 3 — Conexão real (portão)**: só avançar depois que a prova de vida (mudar flag no banco → tela muda sem redeploy) passar de verdade.

Depois disso, seguir Módulos 4 a 13 na ordem da tabela da seção 5, um por sessão, sempre com `verify.sh` rodando antes e depois de cada bloco.

---

## 9. Texto pronto para colar no agente na próxima sessão

```
Resuming Viva+ reconstruction. Module 0, Block 0.2-FIX completed.
Blocker: npm ci fails, error message was swallowed by --silent.

Read docs/PROJECT.md, docs/ARCHITECTURE.md, docs/SECURITY.md and
docs/STATE.md before doing anything. Then confirm you understand:

  a) Which module we are on and which block is next
  b) What Rule R-03 requires of you
  c) What happens if Module 3 fails its proof of life

Do not create, install, or modify anything until I send the next block.
```
