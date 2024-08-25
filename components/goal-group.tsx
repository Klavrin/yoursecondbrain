import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import GoalBlock from './goal-block'
import GoalsModal from './goals-modal'
import { GoPlus } from 'react-icons/go'
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

interface GoalGroupProps {
  data: {
    title: string
    color: string
    titleContainerColor: string
    circleColor: string
    titleColor: string
  }[]
}

const GoalGroup: React.FC<GoalGroupProps> = ({ data }) => {
  const [blocks, setBlocks] = useState(['hello', 'world'])
  const [modalOpened, setModalOpened] = useState(false)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const onDragEnd = useCallback((event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  return (
    <>
      {data.map((item) => (
        <div className={twMerge('p-2', item.color)}>
          <div
            className={twMerge(
              'flex items-center gap-1 px-2 rounded-xl w-min mb-2',
              item.titleContainerColor
            )}
          >
            <div className={twMerge('w-2 h-2 rounded-full', item.circleColor)} />
            <h2 className={twMerge('text-sm whitespace-nowrap', item.titleColor)}>
              {item.title}
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                {blocks.map((block) => (
                  <GoalBlock key={block} id={block}>
                    {block}
                  </GoalBlock>
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <button
            onClick={() => setModalOpened(true)}
            className={twMerge(
              `p-1.5 mt-2 rounded-lg flex items-center w-full hover:bg-gray-400/10 text-sm`,
              item.titleColor
            )}
          >
            <GoPlus className={item.titleColor} size={20} />
            New
          </button>
        </div>
      ))}
      <GoalsModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        setBlocks={setBlocks}
      />
    </>
  )
}

export default GoalGroup
