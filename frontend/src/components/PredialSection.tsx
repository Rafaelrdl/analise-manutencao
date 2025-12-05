import { motion } from 'framer-motion'
import * as Progress from '@radix-ui/react-progress'
import ReactECharts from 'echarts-for-react'
import { IndicadorMes } from '../types'
import { Building2, CheckCircle, Clock, AlertTriangle, Wind } from 'lucide-react'
import KPICard from './KPICard'

interface PredialSectionProps {
  data: IndicadorMes
  allData: IndicadorMes[]
}

export default function PredialSection({ data, allData }: PredialSectionProps) {
  // Dados para o gráfico de gauge
  const gaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color: '#4a9ecc',
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18,
            color: [[1, '#e5e7eb']],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: true,
          offsetCenter: [0, '30%'],
          fontSize: 14,
          color: '#6b7280',
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-10%'],
          fontSize: 32,
          fontWeight: 'bold',
          formatter: '{value}%',
          color: '#1f2937',
        },
        data: [
          {
            value: data['PRED - % Corretivas Fechadas'],
            name: 'Taxa de Fechamento',
          },
        ],
      },
    ],
  }

  // Dados para preventivas AR vs Demais
  const preventivasChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Abertas', 'Fechadas'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['AR SC GD', 'AR CG GZ', 'Demais Preventivas'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Abertas',
        type: 'bar',
        data: [
          data['PRED - Preventivas AR SC GD Abertas'], 
          data['PRED - Preventivas AR CG GZ Abertas'], 
          data['PRED - Demais Preventivas Abertas']
        ],
        itemStyle: { color: '#1a3a5c' },
        barWidth: '40%',
      },
      {
        name: 'Fechadas',
        type: 'bar',
        data: [
          data['PRED - Preventivas AR SC GD Fechadas'], 
          data['PRED - Preventivas AR CG GZ Fechadas'], 
          data['PRED - Demais Preventivas Fechadas']
        ],
        itemStyle: { color: '#4a9ecc' },
        barWidth: '40%',
      },
    ],
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-drumond-light" />
        Manutenção Predial - {data.Mês}
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Corretivas Abertas"
          value={data['PRED - Total Corretivas Abertas'].toString()}
          icon={<Building2 className="w-6 h-6" />}
          color="blue"
        />
        <KPICard
          title="Corretivas Fechadas"
          value={data['PRED - Total Corretivas Fechadas'].toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
          subtitle={`${data['PRED - % Corretivas Fechadas']}%`}
        />
        <KPICard
          title="Preventivas Abertas"
          value={data['PRED - Total Preventivas Abertas'].toString()}
          icon={<Clock className="w-6 h-6" />}
          color="yellow"
        />
        <KPICard
          title="Preventivas Fechadas"
          value={data['PRED - Total Preventivas Fechadas'].toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          color="purple"
          subtitle={`${data['PRED - % Preventivas Fechadas']}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gauge Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Taxa de Fechamento de Corretivas
          </h3>
          <ReactECharts option={gaugeOption} style={{ height: '300px' }} />
        </motion.div>

        {/* Preventivas Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wind className="w-5 h-5 text-drumond-dark" />
            Preventivas por Categoria
          </h3>
          <ReactECharts option={preventivasChartOption} style={{ height: '300px' }} />
        </motion.div>
      </div>

      {/* Progress Bars - SLA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          SLA por Prioridade
        </h3>
        
        <div className="space-y-8">
          {/* Emergente */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Emergente
                </span>
                <span className="text-xs text-gray-500 ml-6">
                  {data['PRED - OS Emergentes']} {data['PRED - OS Emergentes'] === 1 ? 'ordem' : 'ordens'}
                </span>
              </div>
            </div>
            
            {/* Triagem */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600">Triagem</span>
                <span className="text-xs font-semibold text-gray-800">
                  {data['PRED - % SLA Triagem Emergente']}%
                </span>
              </div>
              <Progress.Root
                className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2.5"
                value={data['PRED - % SLA Triagem Emergente']}
              >
                <Progress.Indicator
                  className="bg-red-500 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${100 - data['PRED - % SLA Triagem Emergente']}%)` }}
                />
              </Progress.Root>
            </div>
            
            {/* Fechamento */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600">Fechamento</span>
                <span className="text-xs font-semibold text-gray-800">
                  {data['PRED - % SLA Fechamento Emergente']}%
                </span>
              </div>
              <Progress.Root
                className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2.5"
                value={data['PRED - % SLA Fechamento Emergente']}
              >
                <Progress.Indicator
                  className="bg-red-400 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${100 - data['PRED - % SLA Fechamento Emergente']}%)` }}
                />
              </Progress.Root>
            </div>
          </div>

          {/* Urgente */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Urgente
                </span>
                <span className="text-xs text-gray-500 ml-6">
                  {data['PRED - OS Urgentes']} {data['PRED - OS Urgentes'] === 1 ? 'ordem' : 'ordens'}
                </span>
              </div>
            </div>
            
            {/* Triagem */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600">Triagem</span>
                <span className="text-xs font-semibold text-gray-800">
                  {data['PRED - % SLA Triagem Urgente']}%
                </span>
              </div>
              <Progress.Root
                className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2.5"
                value={data['PRED - % SLA Triagem Urgente']}
              >
                <Progress.Indicator
                  className="bg-yellow-500 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${100 - data['PRED - % SLA Triagem Urgente']}%)` }}
                />
              </Progress.Root>
            </div>
            
            {/* Fechamento */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600">Fechamento</span>
                <span className="text-xs font-semibold text-gray-800">
                  {data['PRED - % SLA Fechamento Urgente']}%
                </span>
              </div>
              <Progress.Root
                className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2.5"
                value={data['PRED - % SLA Fechamento Urgente']}
              >
                <Progress.Indicator
                  className="bg-yellow-400 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${100 - data['PRED - % SLA Fechamento Urgente']}%)` }}
                />
              </Progress.Root>
            </div>
          </div>

          {/* Pouco Urgente */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  Pouco Urgente
                </span>
                <span className="text-xs text-gray-500 ml-6">
                  {data['PRED - OS Pouco Urgentes']} {data['PRED - OS Pouco Urgentes'] === 1 ? 'ordem' : 'ordens'}
                </span>
              </div>
            </div>
            
            {/* Triagem */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600">Triagem</span>
                <span className="text-xs font-semibold text-gray-800">
                  {data['PRED - % SLA Triagem Pouco Urgente']}%
                </span>
              </div>
              <Progress.Root
                className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2.5"
                value={data['PRED - % SLA Triagem Pouco Urgente']}
              >
                <Progress.Indicator
                  className="bg-green-500 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${100 - data['PRED - % SLA Triagem Pouco Urgente']}%)` }}
                />
              </Progress.Root>
            </div>
            
            {/* Fechamento */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-600">Fechamento</span>
                <span className="text-xs font-semibold text-gray-800">
                  {data['PRED - % SLA Fechamento Pouco Urgente']}%
                </span>
              </div>
              <Progress.Root
                className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2.5"
                value={data['PRED - % SLA Fechamento Pouco Urgente']}
              >
                <Progress.Indicator
                  className="bg-green-400 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(-${100 - data['PRED - % SLA Fechamento Pouco Urgente']}%)` }}
                />
              </Progress.Root>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
