'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@/provider/user-provider'
import toast from 'react-hot-toast'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Button } from '@nextui-org/button'

const DayRating = () => {
  const [days, setDays] = useState({
    rated_at: new Date(0),
    days_rated: 0,
    horrible_days: 0,
    bad_days: 0,
    ok_days: 0,
    good_days: 0,
    amazing_days: 0
  })
  const supabase = createClient()
  const { user } = useUser()

  console.log(new Date(days.rated_at).getUTCDate())
  console.log(new Date().getUTCDate())

  useEffect(() => {
    const getDays = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
      if (error) throw error

      setDays(data[0].day_rating)
    }
    getDays()
  }, [])

  const handleIncrementHorribleDays = async () => {
    if (new Date(days.rated_at).getUTCDate() >= new Date().getUTCDate()) {
      toast.error('You can only rate one day in a row!')
      return
    }

    const updatedDays = {
      ...days,
      horrible_days: days.horrible_days + 1,
      days_rated: days.days_rated + 1,
      rated_at: new Date()
    }

    const { error } = await supabase
      .from('users')
      .update({
        day_rating: updatedDays
      })
      .eq('user_id', user.id)

    if (error) throw error
    setDays(updatedDays)
  }

  const handleIncrementBadDays = async () => {
    if (new Date(days.rated_at).getUTCDate() >= new Date().getUTCDate()) {
      toast.error('You can only rate one day in a row!')
      return
    }

    const updatedDays = {
      ...days,
      bad_days: days.bad_days + 1,
      days_rated: days.days_rated + 1,
      rated_at: new Date()
    }

    const { error } = await supabase
      .from('users')
      .update({
        day_rating: updatedDays
      })
      .eq('user_id', user.id)

    if (error) throw error
    setDays(updatedDays)
  }

  const handleIncrementOkDays = async () => {
    if (new Date(days.rated_at).getUTCDate() >= new Date().getUTCDate()) {
      toast.error('You can only rate one day in a row!')
      return
    }

    const updatedDays = {
      ...days,
      ok_days: days.ok_days + 1,
      days_rated: days.days_rated + 1,
      rated_at: new Date()
    }

    const { error } = await supabase
      .from('users')
      .update({
        day_rating: updatedDays
      })
      .eq('user_id', user.id)

    if (error) throw error
    setDays(updatedDays)
  }

  const handleIncrementGoodDays = async () => {
    if (new Date(days.rated_at).getUTCDate() >= new Date().getUTCDate()) {
      toast.error('You can only rate one day in a row!')
      return
    }

    const updatedDays = {
      ...days,
      good_days: days.good_days + 1,
      days_rated: days.days_rated + 1,
      rated_at: new Date()
    }

    const { error } = await supabase
      .from('users')
      .update({
        day_rating: updatedDays
      })
      .eq('user_id', user.id)

    if (error) throw error
    setDays(updatedDays)
  }

  const handleIncrementAmazingDays = async () => {
    if (new Date(days.rated_at).getUTCDate() >= new Date().getUTCDate()) {
      toast.error('You can only rate one day in a row!')
      return
    }

    const updatedDays = {
      ...days,
      amazing_days: days.amazing_days + 1,
      days_rated: days.days_rated + 1,
      rated_at: new Date()
    }

    const { error } = await supabase
      .from('users')
      .update({
        day_rating: updatedDays
      })
      .eq('user_id', user.id)

    if (error) throw error
    setDays(updatedDays)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions={false} />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full">
            <h1>How would you rate your day?</h1>
            <div>
              <Button onClick={handleIncrementHorribleDays}>Horrible</Button>
              <Button onClick={handleIncrementBadDays}>Bad</Button>
              <Button onClick={handleIncrementOkDays}>OK</Button>
              <Button onClick={handleIncrementGoodDays}>Good</Button>
              <Button onClick={handleIncrementAmazingDays}>Amazing</Button>
            </div>

            <div>
              <h2>Out of {days.days_rated} rated days:</h2>
              <ul>
                <li>{days.horrible_days} days were horrible</li>
                <li>{days.bad_days} days were bad</li>
                <li>{days.ok_days} days were OK</li>
                <li>{days.good_days} days were good</li>
                <li>{days.amazing_days} days were amazing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayRating
