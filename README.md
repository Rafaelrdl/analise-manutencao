# Dashboard de Manutenção — Análise de Indicadores

Dashboard interativo para visualização e análise de indicadores de manutenção, dividido em dois setores: **Engenharia Clínica** e **Manutenção Predial**. A aplicação exibe KPIs, gráficos comparativos, análise de SLA e desempenho de técnicos a partir de dados mensais fornecidos via CSV.

## Tecnologias

| Categoria | Tecnologias |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Roteamento | React Router v6 |
| Gráficos | Recharts, ECharts, D3.js |
| Estilização | Tailwind CSS |
| Animações | Framer Motion |
| Componentes UI | Radix UI, Lucide React |
| Dados | PapaParse (parsing CSV) |
| Análise | Python, Pandas (notebook) |

## Estrutura do Projeto

```
├── analise.ipynb                        # Notebook de análise exploratória
├── frontend/
│   ├── public/
│   │   └── indicadores_consolidados.csv # Dados mensais de indicadores
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx               # Barra superior (busca, perfil, notificações)
│   │   │   ├── Sidebar.tsx              # Menu lateral de navegação
│   │   │   ├── KPICard.tsx              # Card de métrica com tendência
│   │   │   ├── MonthSelector.tsx        # Seletor de mês
│   │   │   ├── OverviewCharts.tsx       # Gráficos de visão geral
│   │   │   ├── EngenhariaSection.tsx    # Dashboard de Engenharia Clínica
│   │   │   ├── PredialSection.tsx       # Dashboard de Manutenção Predial
│   │   │   ├── SLACharts.tsx            # Análise de SLA (radar, heatmap)
│   │   │   └── TecnicoSection.tsx       # Desempenho de técnicos
│   │   ├── context/
│   │   │   └── AuthContext.tsx          # Autenticação com localStorage
│   │   ├── pages/
│   │   │   ├── Login.tsx                # Tela de login
│   │   │   └── Dashboard.tsx            # Página principal do dashboard
│   │   ├── types/
│   │   │   └── index.ts                 # Tipos TypeScript
│   │   └── utils/
│   │       └── dataLoader.ts            # Parser de CSV e dados mock
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
```

## Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Instalação e execução

```bash
# 1. Clone o repositório
git clone https://github.com/Rafaelrdl/analise-manutencao.git
cd analise-manutencao

# 2. Instale as dependências do frontend
cd frontend
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

### Build de produção

```bash
cd frontend
npm run build    # Gera build otimizada em dist/
npm run preview  # Pré-visualiza a build localmente
```

### Notebook de Análise

Para executar o notebook `analise.ipynb`, é necessário ter **Python 3** e **Pandas** instalados:

```bash
pip install pandas jupyter
jupyter notebook analise.ipynb
```

## Credenciais de Acesso

| Usuário | Senha | Perfil |
|---|---|---|
| `admin` | `admin123` | Administrador |
| `rafael` | `rafael123` | Rafael Ribeiro |
| `engenharia` | `eng123` | Engenharia Clínica |
| `predial` | `pred123` | Manutenção Predial |

> As credenciais podem ser personalizadas após o login (nome e senha são salvos no localStorage).

## Funcionalidades

### Visão Geral

Comparativos mensais de ordens de serviço corretivas e preventivas, tendências por setor e distribuição geral de OS.

### Engenharia Clínica

KPIs de corretivas/preventivas, gauge de taxa de fechamento, distribuição por prioridade (Emergente, Urgente, Pouco Urgente) e barras de progresso de SLA.

### Manutenção Predial

KPIs específicos do setor, gauge de fechamento, preventivas por categoria (AR SC GD, AR CG GZ, Demais) e acompanhamento de SLA.

### Análise de SLA

Radar comparativo entre setores, evolução temporal do SLA e heatmap de SLA por tipo e prioridade.

### Desempenho de Técnicos

Ranking dos top 10 técnicos, distribuição por setor, comparativo de SLA e filtros por área (Engenharia/Predial).

## Dados

Os indicadores são carregados do arquivo `frontend/public/indicadores_consolidados.csv`, que contém dados mensais com mais de 100 métricas cobrindo:

- Corretivas abertas e fechadas (por setor)
- Preventivas (por categoria)
- SLA de triagem e fechamento (por prioridade)
- Desempenho individual de técnicos

Caso o CSV não esteja disponível, a aplicação utiliza dados mock como fallback.