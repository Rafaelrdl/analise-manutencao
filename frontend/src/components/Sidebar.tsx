import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Activity,
  Building2,
  Clock,
  LogOut,
  ChevronRight,
  Users
} from 'lucide-react'

type ActiveSection = 'overview' | 'engenharia' | 'predial' | 'sla' | 'tecnicos'

interface SidebarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
}

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'engenharia', label: 'Engenharia Clínica', icon: Activity },
  { id: 'predial', label: 'Manutenção Predial', icon: Building2 },
  { id: 'sla', label: 'Análise SLA', icon: Clock },
  { id: 'tecnicos', label: 'Desempenho Técnico', icon: Users },
]

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white shadow-lg flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="/logo-drumond.jpg" alt="Drumond" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <h2 className="font-bold text-drumond-dark">Manutenção</h2>
            <p className="text-xs text-drumond-light">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(item.id as ActiveSection)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-drumond-dark to-drumond-light text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </motion.button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}
