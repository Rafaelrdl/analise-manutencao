import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
  months: string[]
  selectedMonth: string
  onSelectMonth: (month: string) => void
}

export default function MonthSelector({ months, selectedMonth, onSelectMonth }: MonthSelectorProps) {
  const currentIndex = months.indexOf(selectedMonth)
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSelectMonth(months[currentIndex - 1])
    }
  }
  
  const handleNext = () => {
    if (currentIndex < months.length - 1) {
      onSelectMonth(months[currentIndex + 1])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-drumond-light/20 rounded-lg">
          <Calendar className="w-5 h-5 text-drumond-dark" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Período selecionado</p>
          <h3 className="font-bold text-gray-800">{selectedMonth}</h3>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </motion.button>

        {/* Month Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-md px-2">
          {months.map((month) => (
            <motion.button
              key={month}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMonth(month)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                month === selectedMonth
                  ? 'bg-gradient-to-r from-drumond-dark to-drumond-light text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {month}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={currentIndex === months.length - 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>
    </motion.div>
  )
}
