'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import BudgetModal from '@/components/budget-modal'
import BudgetTable from '@/components/budget-table'

const Budget = () => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full">
            <BudgetTable title="Income" type="income" />
            <BudgetTable title="Expenses" type="expenses" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget
