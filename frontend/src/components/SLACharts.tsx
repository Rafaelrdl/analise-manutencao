import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { IndicadorMes } from '../types'
import { Clock, Target, CheckCircle } from 'lucide-react'

interface SLAChartsProps {
  data: IndicadorMes
  allData: IndicadorMes[]
}

export default function SLACharts({ data, allData }: SLAChartsProps) {
  // Dados para o radar chart - Engenharia vs Predial
  const radarData = [
    {
      subject: 'Triagem Emergente',
      Engenharia: data['ENG - % SLA Triagem Emergente'],
      Predial: data['PRED - % SLA Triagem Emergente'],
      fullMark: 100,
    },
    {
      subject: 'Fechamento Emergente',
      Engenharia: data['ENG - % SLA Fechamento Emergente'],
      Predial: data['PRED - % SLA Fechamento Emergente'],
      fullMark: 100,
    },
    {
      subject: 'Triagem Urgente',
      Engenharia: data['ENG - % SLA Triagem Urgente'],
      Predial: data['PRED - % SLA Triagem Urgente'],
      fullMark: 100,
    },
    {
      subject: 'Fechamento Urgente',
      Engenharia: data['ENG - % SLA Fechamento Urgente'],
      Predial: data['PRED - % SLA Fechamento Urgente'],
      fullMark: 100,
    },
    {
      subject: 'Triagem Pouco Urgente',
      Engenharia: data['ENG - % SLA Triagem Pouco Urgente'],
      Predial: data['PRED - % SLA Triagem Pouco Urgente'],
      fullMark: 100,
    },
    {
      subject: 'Fechamento Pouco Urgente',
      Engenharia: data['ENG - % SLA Fechamento Pouco Urgente'],
      Predial: data['PRED - % SLA Fechamento Pouco Urgente'],
      fullMark: 100,
    },
  ]

  // Gráfico de evolução do SLA ao longo dos meses
  const slaEvolutionOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['ENG - Triagem Urgente', 'ENG - Fechamento Urgente', 'PRED - Triagem Urgente', 'PRED - Fechamento Urgente'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: allData.map((d) => d.Mês),
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: [
      {
        name: 'ENG - Triagem Urgente',
        type: 'line',
        data: allData.map((d) => d['ENG - % SLA Triagem Urgente']),
        smooth: true,
        lineStyle: { color: '#1a3a5c' },
        itemStyle: { color: '#1a3a5c' },
      },
      {
        name: 'ENG - Fechamento Urgente',
        type: 'line',
        data: allData.map((d) => d['ENG - % SLA Fechamento Urgente']),
        smooth: true,
        lineStyle: { color: '#1a3a5c', type: 'dashed' },
        itemStyle: { color: '#1a3a5c' },
      },
      {
        name: 'PRED - Triagem Urgente',
        type: 'line',
        data: allData.map((d) => d['PRED - % SLA Triagem Urgente']),
        smooth: true,
        lineStyle: { color: '#4a9ecc' },
        itemStyle: { color: '#4a9ecc' },
      },
      {
        name: 'PRED - Fechamento Urgente',
        type: 'line',
        data: allData.map((d) => d['PRED - % SLA Fechamento Urgente']),
        smooth: true,
        lineStyle: { color: '#4a9ecc', type: 'dashed' },
        itemStyle: { color: '#4a9ecc' },
      },
    ],
  }

  // Heatmap de SLA
  const heatmapData = [
    ['Engenharia', 'Emergente - Triagem', data['ENG - % SLA Triagem Emergente']],
    ['Engenharia', 'Emergente - Fechamento', data['ENG - % SLA Fechamento Emergente']],
    ['Engenharia', 'Urgente - Triagem', data['ENG - % SLA Triagem Urgente']],
    ['Engenharia', 'Urgente - Fechamento', data['ENG - % SLA Fechamento Urgente']],
    ['Engenharia', 'Pouco Urgente - Triagem', data['ENG - % SLA Triagem Pouco Urgente']],
    ['Engenharia', 'Pouco Urgente - Fechamento', data['ENG - % SLA Fechamento Pouco Urgente']],
    ['Predial', 'Emergente - Triagem', data['PRED - % SLA Triagem Emergente']],
    ['Predial', 'Emergente - Fechamento', data['PRED - % SLA Fechamento Emergente']],
    ['Predial', 'Urgente - Triagem', data['PRED - % SLA Triagem Urgente']],
    ['Predial', 'Urgente - Fechamento', data['PRED - % SLA Fechamento Urgente']],
    ['Predial', 'Pouco Urgente - Triagem', data['PRED - % SLA Triagem Pouco Urgente']],
    ['Predial', 'Pouco Urgente - Fechamento', data['PRED - % SLA Fechamento Pouco Urgente']],
  ]

  const heatmapOption = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => `${params.data[0]}<br/>${params.data[1]}: ${params.data[2]}%`,
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['Engenharia', 'Predial'],
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: [
        'Emergente - Triagem',
        'Emergente - Fechamento',
        'Urgente - Triagem',
        'Urgente - Fechamento',
        'Pouco Urgente - Triagem',
        'Pouco Urgente - Fechamento',
      ],
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#ef4444', '#f59e0b', '#22c55e'],
      },
    },
    series: [
      {
        name: 'SLA',
        type: 'heatmap',
        data: heatmapData.map((item) => [
          item[0] === 'Engenharia' ? 0 : 1,
          [
            'Emergente - Triagem',
            'Emergente - Fechamento',
            'Urgente - Triagem',
            'Urgente - Fechamento',
            'Pouco Urgente - Triagem',
            'Pouco Urgente - Fechamento',
          ].indexOf(item[1] as string),
          item[2],
        ]),
        label: {
          show: true,
          formatter: (params: any) => `${params.data[2]}%`,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Target className="w-6 h-6 text-drumond-dark" />
        Análise de SLA - {data.Mês}
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-800">SLA Emergente</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Engenharia</p>
              <p className="text-2xl font-bold text-gray-800">
                {data['ENG - % SLA Triagem Emergente']}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Predial</p>
              <p className="text-2xl font-bold text-gray-800">
                {data['PRED - % SLA Triagem Emergente']}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800">SLA Urgente</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Engenharia</p>
              <p className="text-2xl font-bold text-gray-800">
                {data['ENG - % SLA Triagem Urgente']}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Predial</p>
              <p className="text-2xl font-bold text-gray-800">
                {data['PRED - % SLA Triagem Urgente']}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">SLA Pouco Urgente</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Engenharia</p>
              <p className="text-2xl font-bold text-gray-800">
                {data['ENG - % SLA Triagem Pouco Urgente']}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Predial</p>
              <p className="text-2xl font-bold text-gray-800">
                {data['PRED - % SLA Triagem Pouco Urgente']}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Comparativo de SLA - Radar
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
              <Radar
                name="Engenharia"
                dataKey="Engenharia"
                stroke="#1a3a5c"
                fill="#1a3a5c"
                fillOpacity={0.3}
              />
              <Radar
                name="Predial"
                dataKey="Predial"
                stroke="#4a9ecc"
                fill="#4a9ecc"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Mapa de Calor - SLA
          </h3>
          <ReactECharts option={heatmapOption} style={{ height: '350px' }} />
        </motion.div>
      </div>

      {/* Evolution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Evolução do SLA ao Longo dos Meses
        </h3>
        <ReactECharts option={slaEvolutionOption} style={{ height: '350px' }} />
      </motion.div>
    </div>
  )
}
