import Papa from 'papaparse'
import { IndicadorMes } from '../types'

// Dados mockados baseados no CSV fornecido
const mockData: IndicadorMes[] = [
  {
    'Mês': 'Janeiro',
    'Total Corretivas Abertas': 220,
    'Total Corretivas Fechadas': 217,
    'Total Preventivas Abertas': 452,
    'Total Preventivas Fechadas': 299,
    'ENG - Total Corretivas Abertas': 72,
    'ENG - Total Corretivas Fechadas': 72,
    'ENG - % Corretivas Fechadas': 100.0,
    'ENG - Corretivas Atendidas no Prazo': 53,
    'ENG - % Corretivas Atendidas no Prazo': 73.61,
    'ENG - Total Preventivas Abertas': 321,
    'ENG - Total Preventivas Fechadas': 116,
    'ENG - % Preventivas Fechadas': 100.0,
    'ENG - OS Emergentes': 2,
    'ENG - Emergente Atendidas no Prazo': 0,
    'ENG - % SLA Triagem Emergente': 0.0,
    'ENG - Emergente Fechadas no Prazo': 0,
    'ENG - % SLA Fechamento Emergente': 0,
    'ENG - OS Urgentes': 41,
    'ENG - Urgente Atendidas no Prazo': 38,
    'ENG - % SLA Triagem Urgente': 92.68,
    'ENG - Urgente Fechadas no Prazo': 27,
    'ENG - % SLA Fechamento Urgente': 65.85,
    'ENG - OS Pouco Urgentes': 29,
    'ENG - Pouco Urgente Atendidas no Prazo': 15,
    'ENG - % SLA Triagem Pouco Urgente': 51.72,
    'ENG - Pouco Urgente Fechadas no Prazo': 9,
    'ENG - % SLA Fechamento Pouco Urgente': 31.03,
    'ENG - % Emergentes': 13.01,
    'ENG - % Urgentes': 30.82,
    'ENG - % Pouco Urgentes': 52.74,
    'PRED - Total Corretivas Abertas': 146,
    'PRED - Total Corretivas Fechadas': 144,
    'PRED - % Corretivas Fechadas': 98.63,
    'PRED - Total Preventivas Abertas': 321,
    'PRED - Total Preventivas Fechadas': 319,
    'PRED - % Preventivas Fechadas': 99.38,
    'PRED - Preventivas AR Abertas': 0,
    'PRED - Preventivas AR Fechadas': 0,
    'PRED - Demais Preventivas Abertas': 321,
    'PRED - Demais Preventivas Fechadas': 319,
    'PRED - OS Emergentes': 19,
    'PRED - Emergente Atendidas no Prazo': 10,
    'PRED - % SLA Triagem Emergente': 52.63,
    'PRED - Emergente Fechadas no Prazo': 10,
    'PRED - % SLA Fechamento Emergente': 52.63,
    'PRED - OS Urgentes': 45,
    'PRED - Urgente Atendidas no Prazo': 41,
    'PRED - % SLA Triagem Urgente': 91.11,
    'PRED - Urgente Fechadas no Prazo': 23,
    'PRED - % SLA Fechamento Urgente': 51.11,
    'PRED - OS Pouco Urgentes': 77,
    'PRED - Pouco Urgente Atendidas no Prazo': 67,
    'PRED - % SLA Triagem Pouco Urgente': 87.01,
    'PRED - Pouco Urgente Fechadas no Prazo': 47,
    'PRED - % SLA Fechamento Pouco Urgente': 61.04,
  },
  {
    'Mês': 'Fevereiro',
    'Total Corretivas Abertas': 160,
    'Total Corretivas Fechadas': 158,
    'Total Preventivas Abertas': 455,
    'Total Preventivas Fechadas': 353,
    'ENG - Total Corretivas Abertas': 56,
    'ENG - Total Corretivas Fechadas': 55,
    'ENG - % Corretivas Fechadas': 98.21,
    'ENG - Corretivas Atendidas no Prazo': 29,
    'ENG - % Corretivas Atendidas no Prazo': 51.79,
    'ENG - Total Preventivas Abertas': 305,
    'ENG - Total Preventivas Fechadas': 127,
    'ENG - % Preventivas Fechadas': 100.0,
    'ENG - OS Emergentes': 1,
    'ENG - Emergente Atendidas no Prazo': 1,
    'ENG - % SLA Triagem Emergente': 100.0,
    'ENG - Emergente Fechadas no Prazo': 0,
    'ENG - % SLA Fechamento Emergente': 0,
    'ENG - OS Urgentes': 16,
    'ENG - Urgente Atendidas no Prazo': 14,
    'ENG - % SLA Triagem Urgente': 87.5,
    'ENG - Urgente Fechadas no Prazo': 9,
    'ENG - % SLA Fechamento Urgente': 56.25,
    'ENG - OS Pouco Urgentes': 39,
    'ENG - Pouco Urgente Atendidas no Prazo': 14,
    'ENG - % SLA Triagem Pouco Urgente': 35.9,
    'ENG - Pouco Urgente Fechadas no Prazo': 8,
    'ENG - % SLA Fechamento Pouco Urgente': 20.51,
    'ENG - % Emergentes': 10.0,
    'ENG - % Urgentes': 29.0,
    'ENG - % Pouco Urgentes': 53.0,
    'PRED - Total Corretivas Abertas': 100,
    'PRED - Total Corretivas Fechadas': 99,
    'PRED - % Corretivas Fechadas': 99.0,
    'PRED - Total Preventivas Abertas': 305,
    'PRED - Total Preventivas Fechadas': 304,
    'PRED - % Preventivas Fechadas': 99.67,
    'PRED - Preventivas AR Abertas': 0,
    'PRED - Preventivas AR Fechadas': 0,
    'PRED - Demais Preventivas Abertas': 305,
    'PRED - Demais Preventivas Fechadas': 304,
    'PRED - OS Emergentes': 10,
    'PRED - Emergente Atendidas no Prazo': 9,
    'PRED - % SLA Triagem Emergente': 90.0,
    'PRED - Emergente Fechadas no Prazo': 8,
    'PRED - % SLA Fechamento Emergente': 80.0,
    'PRED - OS Urgentes': 29,
    'PRED - Urgente Atendidas no Prazo': 28,
    'PRED - % SLA Triagem Urgente': 96.55,
    'PRED - Urgente Fechadas no Prazo': 19,
    'PRED - % SLA Fechamento Urgente': 65.52,
    'PRED - OS Pouco Urgentes': 53,
    'PRED - Pouco Urgente Atendidas no Prazo': 49,
    'PRED - % SLA Triagem Pouco Urgente': 92.45,
    'PRED - Pouco Urgente Fechadas no Prazo': 35,
    'PRED - % SLA Fechamento Pouco Urgente': 66.04,
  },
]

export async function loadCSVData(): Promise<IndicadorMes[]> {
  try {
    // Tentar carregar o arquivo CSV
    const response = await fetch('/indicadores_consolidados.csv')
    if (!response.ok) {
      console.log('CSV não encontrado, usando dados mockados')
      return mockData
    }
    
    const csvText = await response.text()
    
    return new Promise((resolve, reject) => {
      Papa.parse<IndicadorMes>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.warn('Erros ao parsear CSV:', results.errors)
          }
          resolve(results.data)
        },
        error: (error) => {
          console.error('Erro ao parsear CSV:', error)
          resolve(mockData)
        },
      })
    })
  } catch (error) {
    console.error('Erro ao carregar CSV:', error)
    return mockData
  }
}

export function getLatestMonth(data: IndicadorMes[]): IndicadorMes | null {
  if (data.length === 0) return null
  return data[data.length - 1]
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR')
}
