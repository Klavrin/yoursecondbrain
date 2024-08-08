import { FaFire } from 'react-icons/fa6'
import { Button } from '@nextui-org/button'

interface UserStreakProps {
  days: number
}

const UserStreak: React.FC<UserStreakProps> = ({ days }) => {
  return (
    <Button
      size="sm"
      variant="light"
      className="flex gap-1 text-neutral-800 items-center"
    >
      <FaFire size={24} className="text-orange-500" />
      <h5>{days}</h5>
    </Button>
  )
}

export default UserStreak
