import { motion } from 'framer-motion'
import * as Progress from '@radix-ui/react-progress'
import ReactECharts from 'echarts-for-react'
import { IndicadorMes } from '../types'
import { Wrench, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import KPICard from './KPICard'

interface EngenhariaSectionProps {
  data: IndicadorMes
  allData: IndicadorMes[]
}

export default function EngenhariaSection({ data, allData }: EngenhariaSectionProps) {
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
          color: '#1a3a5c',
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
            value: data['ENG - % Corretivas Fechadas'],
            name: 'Taxa de Fechamento',
          },
        ],
      },
    ],
  }

  // Dados para distribuição de prioridades
  const priorityChartOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Distribuição',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
        },
        data: [
          { value: data['ENG - % Emergentes'], name: 'Emergentes', itemStyle: { color: '#ef4444' } },
          { value: data['ENG - % Urgentes'], name: 'Urgentes', itemStyle: { color: '#f59e0b' } },
          { value: data['ENG - % Pouco Urgentes'], name: 'Pouco Urgentes', itemStyle: { color: '#22c55e' } },
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Wrench className="w-6 h-6 text-drumond-dark" />
        Engenharia Clínica - {data.Mês}
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Corretivas Abertas"
          value={data['ENG - Total Corretivas Abertas'].toString()}
          icon={<Wrench className="w-6 h-6" />}
          color="blue"
        />
        <KPICard
          title="Corretivas Fechadas"
          value={data['ENG - Total Corretivas Fechadas'].toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
          subtitle={`${data['ENG - % Corretivas Fechadas']}%`}
        />
        <KPICard
          title="Preventivas Abertas"
          value={data['ENG - Total Preventivas Abertas'].toString()}
          icon={<Clock className="w-6 h-6" />}
          color="yellow"
        />
        <KPICard
          title="Atendidas no Prazo"
          value={data['ENG - Corretivas Atendidas no Prazo'].toString()}
          icon={<CheckCircle className="w-6 h-6" />}
          color="purple"
          subtitle={`${data['ENG - % Corretivas Atendidas no Prazo']}%`}
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

        {/* Priority Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribuição por Prioridade
          </h3>
          <ReactECharts option={priorityChartOption} style={{ height: '300px' }} />
        </motion.div>
      </div>

      {/* Progress Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          SLA de Triagem por Prioridade
        </h3>
        
        <div className="space-y-6">
          {/* Emergente */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Emergente
              </span>
              <span className="text-sm font-bold text-gray-800">
                {data['ENG - % SLA Triagem Emergente']}%
              </span>
            </div>
            <Progress.Root
              className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3"
              value={data['ENG - % SLA Triagem Emergente']}
            >
              <Progress.Indicator
                className="bg-red-500 w-full h-full transition-transform duration-500"
                style={{ transform: `translateX(-${100 - data['ENG - % SLA Triagem Emergente']}%)` }}
              />
            </Progress.Root>
          </div>

          {/* Urgente */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Urgente
              </span>
              <span className="text-sm font-bold text-gray-800">
                {data['ENG - % SLA Triagem Urgente']}%
              </span>
            </div>
            <Progress.Root
              className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3"
              value={data['ENG - % SLA Triagem Urgente']}
            >
              <Progress.Indicator
                className="bg-yellow-500 w-full h-full transition-transform duration-500"
                style={{ transform: `translateX(-${100 - data['ENG - % SLA Triagem Urgente']}%)` }}
              />
            </Progress.Root>
          </div>

          {/* Pouco Urgente */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                Pouco Urgente
              </span>
              <span className="text-sm font-bold text-gray-800">
                {data['ENG - % SLA Triagem Pouco Urgente']}%
              </span>
            </div>
            <Progress.Root
              className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3"
              value={data['ENG - % SLA Triagem Pouco Urgente']}
            >
              <Progress.Indicator
                className="bg-green-500 w-full h-full transition-transform duration-500"
                style={{ transform: `translateX(-${100 - data['ENG - % SLA Triagem Pouco Urgente']}%)` }}
              />
            </Progress.Root>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
