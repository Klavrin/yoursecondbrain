'use client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import GoalGroup from '@/components/goal-group'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

const data = [
  {
    id: '64ee9cd1-ce26-485e-be68-68e0e1c863fa',
    title: 'To do',
    color: 'bg-orange-50',
    titleContainerColor: 'bg-orange-100',
    circleColor: 'bg-orange-300',
    titleColor: 'text-orange-500'
  },
  {
    id: '55043cd6-e8a9-4a5f-a3f4-08bd36cc591c',
    title: 'In progress',
    color: 'bg-blue-50',
    titleContainerColor: 'bg-blue-100',
    circleColor: 'bg-blue-300',
    titleColor: 'text-blue-500'
  },
  {
    id: '8caae805-d9fa-4970-a310-6aa833c1a550',
    title: 'Done',
    color: 'bg-green-50',
    titleContainerColor: 'bg-green-100',
    circleColor: 'bg-green-300',
    titleColor: 'text-green-500'
  }
]

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removed)
  return list
}

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const [removed] = source.splice(droppableSource.index, 1)
  destination.splice(droppableDestination.index, 0, removed)

  const result: any = {}
  result[droppableSource.droppableId] = source
  result[droppableDestination.droppableId] = destination

  return result
}

const Goals = () => {
  const [blockItems, setBlockItems] = useState<string[][]>([
    ['1', '2'],
    ['3', '4'],
    ['5', '6']
  ])

  console.log(blockItems)

  const onDragEnd = (event: any) => {
    // If dropped outisde the list
    const { source, destination } = event

    console.log('sourceIndex', source.droppableId)

    if (!destination) return

    const sourceIndex: number = +source.droppableId
    const destinationIndex: number = +destination.droppableId

    if (sourceIndex === destinationIndex) {
      const result = reorder(blockItems[sourceIndex], source.index, destination.index)
      const newBlockItems = [...blockItems]
      newBlockItems[sourceIndex] = result

      setBlockItems(newBlockItems)
    } else {
      console.log('blockItems[sourceIndex]', sourceIndex)

      const result = move(
        blockItems[sourceIndex],
        blockItems[destinationIndex],
        source,
        destination
      )
      const newBlockItems = [...blockItems]
      newBlockItems[sourceIndex] = result[sourceIndex]
      newBlockItems[destinationIndex] = result[destinationIndex]

      setBlockItems(newBlockItems)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header withFeedOptions goalsFeedOptions />
        <div className="flex flex-col items-center max-w-[1028px] mx-auto px-2 mt-4">
          <div className="w-full flex gap-2">
            <DragDropContext onDragEnd={onDragEnd}>
              {data.map((item, index) => (
                <GoalGroup
                  data={item}
                  index={index}
                  blockItems={blockItems}
                  setBlockItems={setBlockItems}
                />
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goals
