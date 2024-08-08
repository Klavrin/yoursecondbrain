import { Spinner } from '@nextui-org/spinner'

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Loading
