import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Users,
  Award,
  TrendingUp,
  Wrench,
  Shield,
  Target,
  Building2,
  Activity,
} from 'lucide-react'
import { IndicadorMes } from '../types'
import { extractTecnicosData, formatNumber, formatPercentage } from '../utils/dataLoader'

interface TecnicoSectionProps {
  data: IndicadorMes
  allData: IndicadorMes[]
}

const COLORS = ['#1a3a5c', '#2d5a7b', '#4a9ecc', '#6bb8dc', '#48b5a0', '#5cc9b5', '#7ed6c4', '#a1e3d6']

export default function TecnicoSection({ data }: TecnicoSectionProps) {
  const [selectedSetor, setSelectedSetor] = useState<'todos' | 'Engenharia Clínica' | 'Predial'>('todos')
  const [sortBy, setSortBy] = useState<'totalOS' | 'percentualAtendimento' | 'percentualFechamento'>('totalOS')

  const tecnicos = extractTecnicosData(data)

  // Filtrar por setor
  const tecnicosFiltrados = selectedSetor === 'todos'
    ? tecnicos
    : tecnicos.filter((t) => t.setor === selectedSetor)

  // Ordenar
  const tecnicosOrdenados = [...tecnicosFiltrados].sort((a, b) => {
    if (sortBy === 'totalOS') return b.totalOS - a.totalOS
    if (sortBy === 'percentualAtendimento') return b.percentualAtendimento - a.percentualAtendimento
    return b.percentualFechamento - a.percentualFechamento
  })

  // Dados para gráfico de barras - Top 10
  const top10Data = tecnicosOrdenados.slice(0, 10).map((t) => ({
    nome: t.nome.split(' ')[0], // Primeiro nome apenas
    nomeCompleto: t.nome,
    corretivas: t.corretivas,
    preventivas: t.preventivas,
    total: t.totalOS,
  }))

  // Dados para gráfico de pizza - Distribuição por setor
  const distribuicaoSetor = [
    {
      name: 'Engenharia Clínica',
      value: tecnicos.filter((t) => t.setor === 'Engenharia Clínica').reduce((acc, t) => acc + t.totalOS, 0),
    },
    {
      name: 'Predial',
      value: tecnicos.filter((t) => t.setor === 'Predial').reduce((acc, t) => acc + t.totalOS, 0),
    },
  ]

  // Dados para radar - Técnico selecionado vs média
  const mediaPercentualAtendimento = tecnicos.reduce((acc, t) => acc + t.percentualAtendimento, 0) / tecnicos.length || 0

  // Estatísticas resumidas
  const totalTecnicos = tecnicos.length
  const totalOS = tecnicos.reduce((acc, t) => acc + t.totalOS, 0)
  const mediaAtendimentoPrazo = mediaPercentualAtendimento
  const melhorTecnico = tecnicosOrdenados[0]

  // Dados para comparativo de SLA
  const slaComparativo = tecnicosOrdenados.slice(0, 8).map((t) => ({
    nome: t.nome.split(' ')[0],
    nomeCompleto: t.nome,
    '% Atendimento': t.percentualAtendimento,
    '% Fechamento': t.percentualFechamento,
  }))

  return (
    <div className="space-y-6">
      {/* Header com estatísticas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-drumond-dark/10 rounded-lg">
              <Users className="w-6 h-6 text-drumond-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Técnicos</p>
              <p className="text-2xl font-bold text-drumond-dark">{totalTecnicos}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-drumond-light/10 rounded-lg">
              <Wrench className="w-6 h-6 text-drumond-light" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de OS Fechadas</p>
              <p className="text-2xl font-bold text-drumond-light">{formatNumber(totalOS)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-drumond-accent/10 rounded-lg">
              <Target className="w-6 h-6 text-drumond-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Média Atendimento no Prazo</p>
              <p className="text-2xl font-bold text-drumond-accent">{formatPercentage(mediaAtendimentoPrazo)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Destaque do Mês</p>
              <p className="text-lg font-bold text-green-600">{melhorTecnico?.nome.split(' ')[0] || '-'}</p>
              <p className="text-xs text-gray-400">{melhorTecnico?.totalOS || 0} OS</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSetor('todos')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSetor === 'todos'
                  ? 'bg-drumond-dark text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedSetor('Engenharia Clínica')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedSetor === 'Engenharia Clínica'
                  ? 'bg-drumond-light text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Activity className="w-4 h-4" />
              Engenharia Clínica
            </button>
            <button
              onClick={() => setSelectedSetor('Predial')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedSetor === 'Predial'
                  ? 'bg-drumond-accent text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Predial
            </button>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-drumond-light"
            >
              <option value="totalOS">Ordenar por: Total OS</option>
              <option value="percentualAtendimento">Ordenar por: % Atendimento</option>
              <option value="percentualFechamento">Ordenar por: % Fechamento</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Técnicos - Gráfico de Barras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-drumond-dark" />
            Top 10 Técnicos - OS Fechadas
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={top10Data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="nome" width={80} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 shadow-lg rounded-lg border">
                        <p className="font-semibold">{data.nomeCompleto}</p>
                        <p className="text-sm text-drumond-dark">Corretivas: {data.corretivas}</p>
                        <p className="text-sm text-drumond-accent">Preventivas: {data.preventivas}</p>
                        <p className="text-sm font-medium">Total: {data.total}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Bar dataKey="corretivas" stackId="a" fill="#1a3a5c" name="Corretivas" />
              <Bar dataKey="preventivas" stackId="a" fill="#48b5a0" name="Preventivas" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribuição por Setor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-drumond-light" />
            Distribuição por Setor
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={distribuicaoSetor}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {distribuicaoSetor.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Comparativo SLA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-drumond-accent" />
          Comparativo de SLA por Técnico
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={slaComparativo}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white p-3 shadow-lg rounded-lg border">
                      <p className="font-semibold">{data.nomeCompleto}</p>
                      <p className="text-sm text-drumond-light">Atendimento: {data['% Atendimento']?.toFixed(1)}%</p>
                      <p className="text-sm text-drumond-accent">Fechamento: {data['% Fechamento']?.toFixed(1)}%</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Bar dataKey="% Atendimento" fill="#4a9ecc" name="% Atendimento no Prazo" />
            <Bar dataKey="% Fechamento" fill="#48b5a0" name="% Fechamento no Prazo" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tabela de Técnicos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-drumond-dark" />
            Detalhamento por Técnico
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Técnico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Setor
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Corretivas
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preventivas
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total OS
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Atendimento
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Fechamento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tecnicosOrdenados.map((tecnico, index) => (
                <motion.tr
                  key={tecnico.nome}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          tecnico.setor === 'Engenharia Clínica' ? 'bg-drumond-light' : 'bg-drumond-accent'
                        }`}>
                          {tecnico.nome.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{tecnico.nome}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tecnico.setor === 'Engenharia Clínica'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {tecnico.setor}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {tecnico.corretivas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {tecnico.preventivas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                    {tecnico.totalOS}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <div className={`px-2 py-1 rounded text-sm font-medium ${
                        tecnico.percentualAtendimento >= 80
                          ? 'bg-green-100 text-green-800'
                          : tecnico.percentualAtendimento >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {formatPercentage(tecnico.percentualAtendimento)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <div className={`px-2 py-1 rounded text-sm font-medium ${
                        tecnico.percentualFechamento >= 80
                          ? 'bg-green-100 text-green-800'
                          : tecnico.percentualFechamento >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {formatPercentage(tecnico.percentualFechamento)}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
