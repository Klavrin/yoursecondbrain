import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import GoalBlock from './goal-block'
import GoalsModal from './goals-modal'
import { GoPlus } from 'react-icons/go'
import { Droppable } from 'react-beautiful-dnd'

interface GoalGroupProps {
  data: {
    id: string
    title: string
    color: string
    titleContainerColor: string
    circleColor: string
    titleColor: string
  }
  index: number
  blockItems: string[][]
  setBlockItems: (value: string[][]) => void
}

const GoalGroup: React.FC<GoalGroupProps> = ({
  data,
  index,
  blockItems,
  setBlockItems
}) => {
  // const [blocks, setBlocks] = useState(['hello', 'world'])
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <>
      <Droppable key={data.id} droppableId={`${index}`}>
        {(provided) => (
          <div
            className={twMerge('p-2 w-full h-min', data.color)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className={twMerge(
                'flex items-center gap-1 px-2 rounded-xl w-min mb-2',
                data.titleContainerColor
              )}
            >
              <div className={twMerge('w-2 h-2 rounded-full', data.circleColor)} />
              <h2 className={twMerge('text-sm whitespace-nowrap', data.titleColor)}>
                {data.title}
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              {blockItems[index].length !== 0
                ? blockItems[index].map((block, ind) => (
                    <GoalBlock key={block} id={block} index={ind}>
                      {block}
                    </GoalBlock>
                  ))
                : null}
            </div>

            <button
              onClick={() => setModalOpened(true)}
              className={twMerge(
                `p-1.5 mt-2 rounded-lg flex items-center w-full hover:bg-gray-400/10 text-sm`,
                data.titleColor
              )}
            >
              <GoPlus className={data.titleColor} size={20} />
              New
            </button>
          </div>
        )}
      </Droppable>

      <GoalsModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        setBlocks={setBlockItems}
      />
    </>
  )
}

export default GoalGroup
