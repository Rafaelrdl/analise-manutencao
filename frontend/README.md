# Dashboard de Manutenção

Dashboard interativo para visualização de indicadores de manutenção (Engenharia Clínica e Predial).

## Tecnologias Utilizadas

- **TypeScript** - Tipagem estática
- **React 18** - Biblioteca de UI
- **Vite** - Build tool e dev server
- **Recharts** - Gráficos interativos
- **ECharts** - Gráficos avançados (Gauge, Heatmap)
- **D3** - Manipulação de dados
- **Lucide React** - Ícones
- **Framer Motion** - Animações
- **Radix UI** - Componentes acessíveis (Progress, Slider)
- **React Resizable** - Componentes redimensionáveis
- **Tailwind CSS** - Estilização
- **React Router** - Navegação

## Instalação

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
frontend/
├── public/
│   └── indicadores_consolidados.csv  # Dados dos indicadores
├── src/
│   ├── components/
│   │   ├── EngenhariaSection.tsx    # Seção Engenharia Clínica
│   │   ├── Header.tsx               # Cabeçalho
│   │   ├── KPICard.tsx             # Cards de KPI
│   │   ├── MonthSelector.tsx       # Seletor de mês
│   │   ├── OverviewCharts.tsx      # Gráficos de visão geral
│   │   ├── PredialSection.tsx      # Seção Manutenção Predial
│   │   ├── Sidebar.tsx             # Menu lateral
│   │   └── SLACharts.tsx           # Gráficos de SLA
│   ├── context/
│   │   └── AuthContext.tsx         # Contexto de autenticação
│   ├── pages/
│   │   ├── Dashboard.tsx           # Página do dashboard
│   │   └── Login.tsx               # Página de login
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript
│   ├── utils/
│   │   └── dataLoader.ts           # Carregador de dados CSV
│   ├── App.tsx                     # Componente raiz
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Estilos globais
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Credenciais de Login

Para acessar o dashboard, use uma das seguintes credenciais:

| Usuário     | Senha       | Nome                |
|-------------|-------------|---------------------|
| admin       | admin123    | Administrador       |
| rafael      | rafael123   | Rafael Ribeiro      |
| engenharia  | eng123      | Engenharia Clínica  |
| predial     | pred123     | Manutenção Predial  |

## Funcionalidades

### Visão Geral
- Cards KPI com totais de corretivas e preventivas
- Gráfico de barras comparativo mensal
- Gráfico de linha de tendência por setor
- Gráfico de pizza de distribuição de OS
- Seletor de mês

### Engenharia Clínica
- KPIs específicos do setor
- Gráfico gauge de taxa de fechamento
- Distribuição por prioridade (pizza)
- Barras de progresso de SLA

### Manutenção Predial
- KPIs específicos do setor
- Gráfico gauge de taxa de fechamento
- Comparativo preventivas AR vs Demais
- Barras de progresso de SLA

### Análise de SLA
- Cards resumo por prioridade
- Gráfico radar comparativo
- Mapa de calor de SLA
- Gráfico de evolução ao longo dos meses

## Atualizando os Dados

Para atualizar os dados do dashboard:

1. Execute o notebook `analise.ipynb` com o arquivo do mês desejado
2. O arquivo `indicadores_consolidados.csv` será atualizado automaticamente
3. Copie o arquivo para `frontend/public/indicadores_consolidados.csv`
4. Recarregue o dashboard

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview da build de produção
