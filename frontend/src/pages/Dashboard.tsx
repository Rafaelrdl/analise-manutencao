import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { loadCSVData, getLatestMonth, formatPercentage, formatNumber } from '../utils/dataLoader'
import { IndicadorMes } from '../types'
import Sidebar from '../components/Sidebar'
import KPICard from '../components/KPICard'
import OverviewCharts from '../components/OverviewCharts'
import EngenhariaSection from '../components/EngenhariaSection'
import PredialSection from '../components/PredialSection'
import SLACharts from '../components/SLACharts'
import MonthSelector from '../components/MonthSelector'
import Header from '../components/Header'
import { 
  Wrench, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

type ActiveSection = 'overview' | 'engenharia' | 'predial' | 'sla'

export default function Dashboard() {
  const [data, setData] = useState<IndicadorMes[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')
  const { user } = useAuth()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const csvData = await loadCSVData()
      setData(csvData)
      if (csvData.length > 0) {
        setSelectedMonth(csvData[csvData.length - 1].Mês)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const currentData = data.find((d) => d.Mês === selectedMonth)
  const previousData = data.length > 1 ? data[data.findIndex((d) => d.Mês === selectedMonth) - 1] : null

  const calculateTrend = (current: number, previous: number | undefined): number => {
    if (!previous || previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Wrench className="w-12 h-12 text-blue-600" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Month Selector */}
            <MonthSelector
              months={data.map((d) => d.Mês)}
              selectedMonth={selectedMonth}
              onSelectMonth={setSelectedMonth}
            />

            {currentData && (
              <>
                {activeSection === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <KPICard
                        title="Corretivas Abertas"
                        value={formatNumber(currentData['Total Corretivas Abertas'])}
                        icon={<Wrench className="w-6 h-6" />}
                        color="blue"
                        trend={calculateTrend(
                          currentData['Total Corretivas Abertas'],
                          previousData?.['Total Corretivas Abertas']
                        )}
                      />
                      <KPICard
                        title="Corretivas Fechadas"
                        value={formatNumber(currentData['Total Corretivas Fechadas'])}
                        icon={<CheckCircle className="w-6 h-6" />}
                        color="green"
                        trend={calculateTrend(
                          currentData['Total Corretivas Fechadas'],
                          previousData?.['Total Corretivas Fechadas']
                        )}
                      />
                      <KPICard
                        title="Preventivas Abertas"
                        value={formatNumber(currentData['Total Preventivas Abertas'])}
                        icon={<Clock className="w-6 h-6" />}
                        color="yellow"
                        trend={calculateTrend(
                          currentData['Total Preventivas Abertas'],
                          previousData?.['Total Preventivas Abertas']
                        )}
                      />
                      <KPICard
                        title="Preventivas Fechadas"
                        value={formatNumber(currentData['Total Preventivas Fechadas'])}
                        icon={<CheckCircle className="w-6 h-6" />}
                        color="purple"
                        trend={calculateTrend(
                          currentData['Total Preventivas Fechadas'],
                          previousData?.['Total Preventivas Fechadas']
                        )}
                      />
                    </div>

                    {/* Overview Charts */}
                    <OverviewCharts data={data} currentMonth={selectedMonth} />
                  </motion.div>
                )}

                {activeSection === 'engenharia' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EngenhariaSection data={currentData} allData={data} />
                  </motion.div>
                )}

                {activeSection === 'predial' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PredialSection data={currentData} allData={data} />
                  </motion.div>
                )}

                {activeSection === 'sla' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SLACharts data={currentData} allData={data} />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
