import Papa from 'papaparse'
import { IndicadorMes } from '../types'

// Dados mockados baseados no CSV fornecido (incluindo dados de técnicos)
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
    // Dados dos técnicos - Janeiro
    'TEC - Alvaro Luiz - Setor': 'Predial',
    'TEC - Alvaro Luiz - Corretivas': 21,
    'TEC - Alvaro Luiz - Preventivas': 18,
    'TEC - Alvaro Luiz - Total OS': 39,
    'TEC - Alvaro Luiz - Atendidas no Prazo': 18,
    'TEC - Alvaro Luiz - Fechadas no Prazo': 14,
    'TEC - Alvaro Luiz - % Atend. Prazo': 46.15,
    'TEC - Alvaro Luiz - % Fech. Prazo': 35.9,
    'TEC - Daniel Pereira - Setor': 'Predial',
    'TEC - Daniel Pereira - Corretivas': 5,
    'TEC - Daniel Pereira - Preventivas': 108,
    'TEC - Daniel Pereira - Total OS': 114,
    'TEC - Daniel Pereira - Atendidas no Prazo': 5,
    'TEC - Daniel Pereira - Fechadas no Prazo': 5,
    'TEC - Daniel Pereira - % Atend. Prazo': 4.39,
    'TEC - Daniel Pereira - % Fech. Prazo': 4.39,
    'TEC - Diego Mendes - Setor': 'Predial',
    'TEC - Diego Mendes - Corretivas': 18,
    'TEC - Diego Mendes - Preventivas': 26,
    'TEC - Diego Mendes - Total OS': 44,
    'TEC - Diego Mendes - Atendidas no Prazo': 18,
    'TEC - Diego Mendes - Fechadas no Prazo': 16,
    'TEC - Diego Mendes - % Atend. Prazo': 40.91,
    'TEC - Diego Mendes - % Fech. Prazo': 36.36,
    'TEC - Gabriel da Silva - Setor': 'Predial',
    'TEC - Gabriel da Silva - Corretivas': 53,
    'TEC - Gabriel da Silva - Preventivas': 0,
    'TEC - Gabriel da Silva - Total OS': 59,
    'TEC - Gabriel da Silva - Atendidas no Prazo': 50,
    'TEC - Gabriel da Silva - Fechadas no Prazo': 26,
    'TEC - Gabriel da Silva - % Atend. Prazo': 84.75,
    'TEC - Gabriel da Silva - % Fech. Prazo': 44.07,
    'TEC - Guilherme Breno Magalhaes - Setor': 'Predial',
    'TEC - Guilherme Breno Magalhaes - Corretivas': 37,
    'TEC - Guilherme Breno Magalhaes - Preventivas': 12,
    'TEC - Guilherme Breno Magalhaes - Total OS': 53,
    'TEC - Guilherme Breno Magalhaes - Atendidas no Prazo': 32,
    'TEC - Guilherme Breno Magalhaes - Fechadas no Prazo': 23,
    'TEC - Guilherme Breno Magalhaes - % Atend. Prazo': 60.38,
    'TEC - Guilherme Breno Magalhaes - % Fech. Prazo': 43.4,
    'TEC - Lara Soares - Setor': 'Engenharia Clínica',
    'TEC - Lara Soares - Corretivas': 46,
    'TEC - Lara Soares - Preventivas': 59,
    'TEC - Lara Soares - Total OS': 105,
    'TEC - Lara Soares - Atendidas no Prazo': 37,
    'TEC - Lara Soares - Fechadas no Prazo': 23,
    'TEC - Lara Soares - % Atend. Prazo': 35.24,
    'TEC - Lara Soares - % Fech. Prazo': 21.9,
    'TEC - Leonardo Oliveira - Setor': 'Predial',
    'TEC - Leonardo Oliveira - Corretivas': 2,
    'TEC - Leonardo Oliveira - Preventivas': 0,
    'TEC - Leonardo Oliveira - Total OS': 4,
    'TEC - Leonardo Oliveira - Atendidas no Prazo': 3,
    'TEC - Leonardo Oliveira - Fechadas no Prazo': 2,
    'TEC - Leonardo Oliveira - % Atend. Prazo': 75.0,
    'TEC - Leonardo Oliveira - % Fech. Prazo': 50.0,
    'TEC - Rafael Ribeiro - Setor': 'Predial',
    'TEC - Rafael Ribeiro - Corretivas': 8,
    'TEC - Rafael Ribeiro - Preventivas': 7,
    'TEC - Rafael Ribeiro - Total OS': 15,
    'TEC - Rafael Ribeiro - Atendidas no Prazo': 6,
    'TEC - Rafael Ribeiro - Fechadas no Prazo': 1,
    'TEC - Rafael Ribeiro - % Atend. Prazo': 40.0,
    'TEC - Rafael Ribeiro - % Fech. Prazo': 6.67,
  } as IndicadorMes,
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
    // Dados dos técnicos - Fevereiro
    'TEC - Alvaro Luiz - Setor': 'Predial',
    'TEC - Alvaro Luiz - Corretivas': 11,
    'TEC - Alvaro Luiz - Preventivas': 0,
    'TEC - Alvaro Luiz - Total OS': 11,
    'TEC - Alvaro Luiz - Atendidas no Prazo': 11,
    'TEC - Alvaro Luiz - Fechadas no Prazo': 9,
    'TEC - Alvaro Luiz - % Atend. Prazo': 100.0,
    'TEC - Alvaro Luiz - % Fech. Prazo': 81.82,
    'TEC - Daniel Pereira - Setor': 'Predial',
    'TEC - Daniel Pereira - Corretivas': 15,
    'TEC - Daniel Pereira - Preventivas': 155,
    'TEC - Daniel Pereira - Total OS': 170,
    'TEC - Daniel Pereira - Atendidas no Prazo': 15,
    'TEC - Daniel Pereira - Fechadas no Prazo': 11,
    'TEC - Daniel Pereira - % Atend. Prazo': 8.82,
    'TEC - Daniel Pereira - % Fech. Prazo': 6.47,
    'TEC - Diego Mendes - Setor': 'Predial',
    'TEC - Diego Mendes - Corretivas': 11,
    'TEC - Diego Mendes - Preventivas': 17,
    'TEC - Diego Mendes - Total OS': 28,
    'TEC - Diego Mendes - Atendidas no Prazo': 10,
    'TEC - Diego Mendes - Fechadas no Prazo': 10,
    'TEC - Diego Mendes - % Atend. Prazo': 35.71,
    'TEC - Diego Mendes - % Fech. Prazo': 35.71,
    'TEC - Gabriel da Silva - Setor': 'Predial',
    'TEC - Gabriel da Silva - Corretivas': 24,
    'TEC - Gabriel da Silva - Preventivas': 0,
    'TEC - Gabriel da Silva - Total OS': 24,
    'TEC - Gabriel da Silva - Atendidas no Prazo': 24,
    'TEC - Gabriel da Silva - Fechadas no Prazo': 16,
    'TEC - Gabriel da Silva - % Atend. Prazo': 100.0,
    'TEC - Gabriel da Silva - % Fech. Prazo': 66.67,
    'TEC - Guilherme Breno Magalhaes - Setor': 'Predial',
    'TEC - Guilherme Breno Magalhaes - Corretivas': 27,
    'TEC - Guilherme Breno Magalhaes - Preventivas': 28,
    'TEC - Guilherme Breno Magalhaes - Total OS': 55,
    'TEC - Guilherme Breno Magalhaes - Atendidas no Prazo': 23,
    'TEC - Guilherme Breno Magalhaes - Fechadas no Prazo': 17,
    'TEC - Guilherme Breno Magalhaes - % Atend. Prazo': 41.82,
    'TEC - Guilherme Breno Magalhaes - % Fech. Prazo': 30.91,
    'TEC - Lara Soares - Setor': 'Engenharia Clínica',
    'TEC - Lara Soares - Corretivas': 27,
    'TEC - Lara Soares - Preventivas': 62,
    'TEC - Lara Soares - Total OS': 89,
    'TEC - Lara Soares - Atendidas no Prazo': 22,
    'TEC - Lara Soares - Fechadas no Prazo': 12,
    'TEC - Lara Soares - % Atend. Prazo': 24.72,
    'TEC - Lara Soares - % Fech. Prazo': 13.48,
    'TEC - Leonardo Oliveira - Setor': 'Predial',
    'TEC - Leonardo Oliveira - Corretivas': 8,
    'TEC - Leonardo Oliveira - Preventivas': 0,
    'TEC - Leonardo Oliveira - Total OS': 8,
    'TEC - Leonardo Oliveira - Atendidas no Prazo': 7,
    'TEC - Leonardo Oliveira - Fechadas no Prazo': 3,
    'TEC - Leonardo Oliveira - % Atend. Prazo': 87.5,
    'TEC - Leonardo Oliveira - % Fech. Prazo': 37.5,
    'TEC - Rafael Ribeiro - Setor': 'Predial',
    'TEC - Rafael Ribeiro - Corretivas': 1,
    'TEC - Rafael Ribeiro - Preventivas': 7,
    'TEC - Rafael Ribeiro - Total OS': 8,
    'TEC - Rafael Ribeiro - Atendidas no Prazo': 1,
    'TEC - Rafael Ribeiro - Fechadas no Prazo': 1,
    'TEC - Rafael Ribeiro - % Atend. Prazo': 12.5,
    'TEC - Rafael Ribeiro - % Fech. Prazo': 12.5,
  } as IndicadorMes,
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

export function extractTecnicosData(data: IndicadorMes): TecnicoData[] {
  const tecnicos: TecnicoData[] = []
  const tecnicoNames = new Set<string>()

  // Encontrar todos os nomes de técnicos nas chaves do objeto
  Object.keys(data).forEach((key) => {
    const match = key.match(/^TEC - (.+?) - /)
    if (match) {
      tecnicoNames.add(match[1])
    }
  })

  // Extrair dados de cada técnico
  tecnicoNames.forEach((nome) => {
    const prefix = `TEC - ${nome}`
    let setor = (data as any)[`${prefix} - Setor`] || ''
    
    // Forçar Diego e Lara para Engenharia Clínica
    if (nome === 'Diego' || nome === 'Lara') {
      setor = 'Engenharia Clínica'
    }
    
    const corretivas = Number((data as any)[`${prefix} - Corretivas`]) || 0
    const preventivas = Number((data as any)[`${prefix} - Preventivas`]) || 0
    const totalOS = Number((data as any)[`${prefix} - Total OS`]) || 0
    const atendidasNoPrazo = Number((data as any)[`${prefix} - Atendidas no Prazo`]) || 0
    const fechadasNoPrazo = Number((data as any)[`${prefix} - Fechadas no Prazo`]) || 0
    const percentualAtendimento = Number((data as any)[`${prefix} - % Atend. Prazo`]) || 0
    const percentualFechamento = Number((data as any)[`${prefix} - % Fech. Prazo`]) || 0

    if (totalOS > 0) {
      tecnicos.push({
        nome,
        setor,
        corretivas,
        preventivas,
        totalOS,
        atendidasNoPrazo,
        fechadasNoPrazo,
        percentualAtendimento,
        percentualFechamento,
      })
    }
  })

  // Ordenar por total de OS (maior para menor)
  return tecnicos.sort((a, b) => b.totalOS - a.totalOS)
}
