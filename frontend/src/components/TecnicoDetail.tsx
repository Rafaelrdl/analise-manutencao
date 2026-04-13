import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  ArrowLeft,
  Wrench,
  CheckCircle,
  Target,
  TrendingUp,
  Activity,
  Building2,
  AlertTriangle,
  Clock,
  CalendarDays,
  ChevronRight,
  MapPin,
  FileText,
} from 'lucide-react'
import { TecnicoData, IndicadorMes, OSDetalhe } from '../types'
import { extractTecnicosData, formatPercentage, formatNumber, loadOSDetalhadas } from '../utils/dataLoader'

interface TecnicoDetailProps {
  tecnico: TecnicoData
  allData: IndicadorMes[]
  currentMonth: string
  onBack: () => void
}

// Mapa de meses PT → número e dias no mês (2026)
const MESES: Record<string, { num: number; dias: number }> = {
  Janeiro:   { num: 1,  dias: 31 },
  Fevereiro: { num: 2,  dias: 28 },
  Março:     { num: 3,  dias: 31 },
  Abril:     { num: 4,  dias: 30 },
  Maio:      { num: 5,  dias: 31 },
  Junho:     { num: 6,  dias: 30 },
  Julho:     { num: 7,  dias: 31 },
  Agosto:    { num: 8,  dias: 31 },
  Setembro:  { num: 9,  dias: 30 },
  Outubro:   { num: 10, dias: 31 },
  Novembro:  { num: 11, dias: 30 },
  Dezembro:  { num: 12, dias: 31 },
}

const CHART_COLORS = ['#1a3a5c', '#48b5a0', '#4a9ecc', '#f59e0b']

function SLAGauge({ value, label }: { value: number; label: string }) {
  const color   = value >= 80 ? '#16a34a' : value >= 50 ? '#d97706' : '#dc2626'
  const bgColor = value >= 80 ? 'bg-green-100' : value >= 50 ? 'bg-yellow-100' : 'bg-red-100'
  const textColor = value >= 80 ? 'text-green-700' : value >= 50 ? 'text-yellow-700' : 'text-red-700'
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}>
          {formatPercentage(value)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function estadoBadge(estado: string) {
  const map: Record<string, string> = {
    Fechada:      'bg-green-100 text-green-800',
    Aberta:       'bg-yellow-100 text-yellow-800',
    'Em andamento': 'bg-blue-100 text-blue-800',
    Cancelada:    'bg-gray-100 text-gray-600',
  }
  return map[estado] ?? 'bg-gray-100 text-gray-600'
}

function prioridadeBadge(p: string) {
  const map: Record<string, string> = {
    Emergente:       'bg-red-100 text-red-800',
    Urgente:         'bg-orange-100 text-orange-800',
    'Pouco urgente': 'bg-yellow-100 text-yellow-800',
    'Não urgente':   'bg-gray-100 text-gray-600',
  }
  return map[p] ?? 'bg-gray-100 text-gray-600'
}


export default function TecnicoDetail({ tecnico, allData, currentMonth, onBack }: TecnicoDetailProps) {
  const isEngenharia = tecnico.setor === 'Engenharia Clínica'

  // Estado para seleção de dia
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [osData, setOsData] = useState<OSDetalhe[]>([])
  const [isLoadingOS, setIsLoadingOS] = useState(true)

  // Calcular dias disponíveis para o mês selecionado
  const mesInfo = MESES[currentMonth]
  const today = new Date()
  const isCurrentMonth =
    mesInfo &&
    today.getMonth() + 1 === mesInfo.num &&
    today.getFullYear() === 2026  // ajustar caso necessário
  const maxDia = isCurrentMonth ? today.getDate() : (mesInfo?.dias ?? 31)
  const dias = mesInfo ? Array.from({ length: maxDia }, (_, i) => i + 1) : []

  useEffect(() => {
    loadOSDetalhadas().then((data) => {
      setOsData(data)
      setIsLoadingOS(false)
    })
  }, [])

  // OS do técnico no mês atual
  const osDoTecnicoNoMes = osData.filter(
    (os) => os.responsavel === tecnico.nome && os.mes === currentMonth
  )

  // OS do dia selecionado (usa data_criacao como referência)
  const osNoDia = selectedDay
    ? osDoTecnicoNoMes.filter((os) => {
        const dataCriacao = os.data_criacao || ''
        const dataConclusao = os.data_conclusao || ''
        const diaRef = (dataConclusao && dataConclusao !== 'NaT') ? dataConclusao : dataCriacao
        if (!diaRef || diaRef === 'NaT') return false
        const d = parseInt(diaRef.split('-')[2] ?? '0', 10)
        return d === selectedDay
      })
    : []

  // Contagem de OS por dia para highlight
  const osPorDia: Record<number, number> = {}
  osDoTecnicoNoMes.forEach((os) => {
    const dataCriacao = os.data_criacao || ''
    const dataConclusao = os.data_conclusao || ''
    const diaRef = (dataConclusao && dataConclusao !== 'NaT') ? dataConclusao : dataCriacao
    if (!diaRef || diaRef === 'NaT') return
    const d = parseInt(diaRef.split('-')[2] ?? '0', 10)
    if (d) osPorDia[d] = (osPorDia[d] || 0) + 1
  })

  // Dados históricos
  const historicalData = allData
    .map((monthData) => {
      const tec = extractTecnicosData(monthData).find((t) => t.nome === tecnico.nome)
      return {
        mes: monthData.Mês.substring(0, 3),
        totalOS: tec?.totalOS ?? 0,
        corretivas: tec?.corretivas ?? 0,
        preventivas: tec?.preventivas ?? 0,
        percAtendimento: tec?.percentualAtendimento ?? 0,
        percFechamento: tec?.percentualFechamento ?? 0,
        atendidasNoPrazo: tec?.atendidasNoPrazo ?? 0,
        fechadasNoPrazo: tec?.fechadasNoPrazo ?? 0,
      }
    })
    .filter((d) => d.totalOS > 0)

  const mediaSLAAtendimento =
    historicalData.length > 0
      ? historicalData.reduce((acc, d) => acc + d.percAtendimento, 0) / historicalData.length
      : 0
  const mediaSLAFechamento =
    historicalData.length > 0
      ? historicalData.reduce((acc, d) => acc + d.percFechamento, 0) / historicalData.length
      : 0
  const totalOSAcumulado = historicalData.reduce((acc, d) => acc + d.totalOS, 0)

  const pieData = [
    { name: 'Corretivas', value: tecnico.corretivas },
    { name: 'Preventivas', value: tecnico.preventivas },
  ].filter((d) => d.value > 0)

  const kpiCards = [
    { label: 'Total OS (mês)', value: formatNumber(tecnico.totalOS), icon: <Wrench className="w-5 h-5" />, color: isEngenharia ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600' },
    { label: 'Corretivas',     value: formatNumber(tecnico.corretivas), icon: <AlertTriangle className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
    { label: 'Preventivas',    value: formatNumber(tecnico.preventivas), icon: <Clock className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    { label: 'Atendidas no Prazo', value: formatNumber(tecnico.atendidasNoPrazo), icon: <Target className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
    { label: 'Fechadas no Prazo',  value: formatNumber(tecnico.fechadasNoPrazo), icon: <CheckCircle className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'OS Acumuladas',  value: formatNumber(totalOSAcumulado), icon: <TrendingUp className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2 text-gray-600 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 ${isEngenharia ? 'bg-drumond-light' : 'bg-drumond-accent'}`}>
            {tecnico.nome.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{tecnico.nome}</h2>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mt-1 ${isEngenharia ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {isEngenharia ? <Activity className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
              {tecnico.setor}
            </span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-white rounded-xl shadow-lg p-4">
            <div className={`inline-flex p-2 rounded-lg mb-2 ${card.color}`}>{card.icon}</div>
            <p className="text-xs text-gray-500 leading-tight">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ─── SELETOR DE DIAS ─── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-drumond-light" />
            Atividade Diária — {currentMonth}
            {isCurrentMonth && <span className="ml-2 text-xs font-normal text-gray-400">(até dia {today.getDate()})</span>}
          </h3>
          {selectedDay && (
            <button onClick={() => setSelectedDay(null)} className="text-xs text-gray-500 hover:text-gray-700 underline">
              Limpar seleção
            </button>
          )}
        </div>

        {/* Grade de dias */}
        <div className="flex flex-wrap gap-2">
          {dias.map((dia) => {
            const qtd = osPorDia[dia] ?? 0
            const isSelected = selectedDay === dia
            return (
              <button
                key={dia}
                onClick={() => setSelectedDay(isSelected ? null : dia)}
                className={`relative w-11 h-11 rounded-lg text-sm font-semibold transition-all
                  ${isSelected
                    ? isEngenharia ? 'bg-drumond-light text-white shadow-md scale-110' : 'bg-drumond-accent text-white shadow-md scale-110'
                    : qtd > 0
                      ? isEngenharia ? 'bg-blue-50 text-drumond-light border-2 border-drumond-light hover:bg-drumond-light hover:text-white' : 'bg-teal-50 text-drumond-accent border-2 border-drumond-accent hover:bg-drumond-accent hover:text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
              >
                {dia}
                {qtd > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white font-bold ${isSelected ? 'bg-white !text-drumond-light' : 'bg-red-500'}`}>
                    {qtd > 9 ? '9+' : qtd}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {isLoadingOS && (
          <p className="text-sm text-gray-400 mt-3">Carregando OS...</p>
        )}

        {/* Lista de OS do dia selecionado */}
        <AnimatePresence>
          {selectedDay && !isLoadingOS && (
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3">
                <ChevronRight className="w-4 h-4 text-drumond-light" />
                <span className="font-semibold text-gray-700">
                  Dia {String(selectedDay).padStart(2, '0')} de {currentMonth} — {osNoDia.length} OS
                </span>
              </div>

              {osNoDia.length === 0 ? (
                <div className="text-sm text-gray-400 py-4 text-center bg-gray-50 rounded-lg">
                  Nenhuma OS registrada neste dia para {tecnico.nome}.
                </div>
              ) : (
                <div className="space-y-2">
                  {osNoDia.map((os, idx) => (
                    <motion.div
                      key={`${os.numero}-${idx}`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors"
                    >
                      {/* Número e badges */}
                      <div className="flex-shrink-0 flex flex-col gap-1 min-w-[130px]">
                        <span className="text-sm font-bold text-gray-800">#{os.numero || '—'}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${estadoBadge(os.estado)}`}>{os.estado || '—'}</span>
                        {os.prioridade && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${prioridadeBadge(os.prioridade)}`}>{os.prioridade}</span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${os.tipo === 'Manutenção Corretiva' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                          {os.tipo === 'Manutenção Corretiva' ? 'Corretiva' : 'Preventiva'}
                        </span>
                      </div>

                      {/* Detalhes */}
                      <div className="flex-1 space-y-1">
                        {os.problema && (
                          <div className="flex items-start gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700 line-clamp-2">{os.problema}</p>
                          </div>
                        )}
                        {os.localizacao && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <p className="text-xs text-gray-500">{os.localizacao}</p>
                          </div>
                        )}
                        <div className="flex gap-4 text-xs text-gray-400 pt-0.5">
                          {os.data_criacao && os.data_criacao !== 'NaT' && (
                            <span>Abertura: {os.data_criacao}</span>
                          )}
                          {os.data_conclusao && os.data_conclusao !== 'NaT' && (
                            <span>Conclusão: {os.data_conclusao}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SLA do Mês Atual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Target className="w-5 h-5 text-drumond-accent" />
          SLA — {currentMonth}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SLAGauge value={tecnico.percentualAtendimento} label="Atendimento no Prazo" />
            <SLAGauge value={tecnico.percentualFechamento} label="Fechamento no Prazo" />
          </div>
          <div className="space-y-4">
            <SLAGauge value={mediaSLAAtendimento} label="Média Histórica — Atendimento" />
            <SLAGauge value={mediaSLAFechamento} label="Média Histórica — Fechamento" />
          </div>
        </div>
      </motion.div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-drumond-dark" />
            Evolução Mensal de OS
          </h3>
          {historicalData.length > 1 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis allowDecimals={false} />
                <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                  <div className="bg-white p-3 shadow-lg rounded-lg border text-sm">
                    <p className="font-semibold mb-1">{label}</p>
                    {payload.map((p) => <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
                  </div>
                ) : null} />
                <Legend />
                <Bar dataKey="corretivas" stackId="a" fill="#1a3a5c" name="Corretivas" />
                <Bar dataKey="preventivas" stackId="a" fill="#48b5a0" name="Preventivas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Dados históricos insuficientes.</div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-drumond-light" />
            Distribuição (mês)
          </h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((_, index) => <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value: number) => formatNumber(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Sem dados.</div>
          )}
        </motion.div>
      </div>

      {/* SLA Histórico */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-drumond-accent" />
          Evolução de SLA (%)
        </h3>
        {historicalData.length > 1 ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div className="bg-white p-3 shadow-lg rounded-lg border text-sm">
                  <p className="font-semibold mb-1">{label}</p>
                  {payload.map((p) => <p key={p.name} style={{ color: p.color }}>{p.name}: {Number(p.value).toFixed(1)}%</p>)}
                </div>
              ) : null} />
              <Legend />
              <Line type="monotone" dataKey="percAtendimento" stroke="#4a9ecc" strokeWidth={2} dot={{ r: 4 }} name="% Atendimento" />
              <Line type="monotone" dataKey="percFechamento" stroke="#48b5a0" strokeWidth={2} dot={{ r: 4 }} name="% Fechamento" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Dados históricos insuficientes.</div>
        )}
      </motion.div>
    </div>
  )
}
