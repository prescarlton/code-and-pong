"use client"

import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button"

interface ScoreCardProps {
  score: number
  setScore: Dispatch<SetStateAction<number>>
  playerName: string
}

const ScoreCard = ({ playerName, score, setScore }: ScoreCardProps) => {
  const increment = () => setScore((prev) => prev + 1)
  const decrement = () => setScore((prev) => (prev > 0 ? prev - 1 : prev))

  return (
    <div
      className="odd:bg-blue-400 even:bg-red-400 rounded-lg flex-1 p-4 flex flex-col justify-between select-none"
      onClick={increment}
    >
      <h2 className="text-white font-bold text-xl">{playerName}</h2>
      <h1 className="text-white text-9xl text-center">{score}</h1>
      <div className="flex flex-row justify-between gap-2">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            decrement()
          }}
          className=""
        >
          -1 Point
        </Button>
      </div>
    </div>
  )
}
export default ScoreCard
