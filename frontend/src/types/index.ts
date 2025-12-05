export interface IndicadorMes {
  Mês: string
  'Total Corretivas Abertas': number
  'Total Corretivas Fechadas': number
  'Total Preventivas Abertas': number
  'Total Preventivas Fechadas': number
  'ENG - Total Corretivas Abertas': number
  'ENG - Total Corretivas Fechadas': number
  'ENG - % Corretivas Fechadas': number
  'ENG - Corretivas Atendidas no Prazo': number
  'ENG - % Corretivas Atendidas no Prazo': number
  'ENG - Total Preventivas Abertas': number
  'ENG - Total Preventivas Fechadas': number
  'ENG - % Preventivas Fechadas': number
  'ENG - OS Emergentes': number
  'ENG - Emergente Atendidas no Prazo': number
  'ENG - % SLA Triagem Emergente': number
  'ENG - Emergente Fechadas no Prazo': number
  'ENG - % SLA Fechamento Emergente': number
  'ENG - OS Urgentes': number
  'ENG - Urgente Atendidas no Prazo': number
  'ENG - % SLA Triagem Urgente': number
  'ENG - Urgente Fechadas no Prazo': number
  'ENG - % SLA Fechamento Urgente': number
  'ENG - OS Pouco Urgentes': number
  'ENG - Pouco Urgente Atendidas no Prazo': number
  'ENG - % SLA Triagem Pouco Urgente': number
  'ENG - Pouco Urgente Fechadas no Prazo': number
  'ENG - % SLA Fechamento Pouco Urgente': number
  'ENG - Qtd Emergentes': number
  'ENG - Qtd Urgentes': number
  'ENG - Qtd Pouco Urgentes': number
  'ENG - % Emergentes': number
  'ENG - % Urgentes': number
  'ENG - % Pouco Urgentes': number
  'PRED - Total Corretivas Abertas': number
  'PRED - Total Corretivas Fechadas': number
  'PRED - % Corretivas Fechadas': number
  'PRED - Total Preventivas Abertas': number
  'PRED - Total Preventivas Fechadas': number
  'PRED - % Preventivas Fechadas': number
  'PRED - Preventivas AR SC GD Abertas': number
  'PRED - Preventivas AR SC GD Fechadas': number
  'PRED - Preventivas AR CG GZ Abertas': number
  'PRED - Preventivas AR CG GZ Fechadas': number
  'PRED - Demais Preventivas Abertas': number
  'PRED - Demais Preventivas Fechadas': number
  'PRED - OS Emergentes': number
  'PRED - Emergente Atendidas no Prazo': number
  'PRED - % SLA Triagem Emergente': number
  'PRED - Emergente Fechadas no Prazo': number
  'PRED - % SLA Fechamento Emergente': number
  'PRED - OS Urgentes': number
  'PRED - Urgente Atendidas no Prazo': number
  'PRED - % SLA Triagem Urgente': number
  'PRED - Urgente Fechadas no Prazo': number
  'PRED - % SLA Fechamento Urgente': number
  'PRED - OS Pouco Urgentes': number
  'PRED - Pouco Urgente Atendidas no Prazo': number
  'PRED - % SLA Triagem Pouco Urgente': number
  'PRED - Pouco Urgente Fechadas no Prazo': number
  'PRED - % SLA Fechamento Pouco Urgente': number
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

export interface TecnicoData {
  nome: string
  setor: string
  corretivas: number
  preventivas: number
  totalOS: number
  atendidasNoPrazo: number
  fechadasNoPrazo: number
  percentualAtendimento: number
  percentualFechamento: number
}
