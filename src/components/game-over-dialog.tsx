import { ShortUser } from "@/actions/listUsers"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Crown } from "lucide-react"
import createGame from "@/actions/createGame"

interface GameOverDialogProps {
  myScore: number
  opponentScore: number
  opponent: ShortUser
  isOpen: boolean
  close: () => void
}

const GameOverDialog = ({
  myScore,
  opponentScore,
  opponent,
  isOpen,
  close,
}: GameOverDialogProps) => {
  const [gameCreated, setGameCreated] = useState(false)
  const { user } = useUser()
  const winner = myScore > opponentScore ? user : opponent

  useEffect(() => {
    if (isOpen)
      createGame({
        opponentId: opponent.id,
        myScore,
        opponentScore,
      }).then((res) => {
        setGameCreated(true)
      })
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!gameCreated) return
        if (!open) close()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Over!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="w-24 h-24 rounded-full relative animate-pulse">
            <Crown className="absolute fill-yellow-500 -top-4 -left-2 -rotate-[30deg] z-20 w-12 h-12" />
            <div className="w-24 h-24 rounded-full relative overflow-hidden">
              <Image
                src={winner!.imageUrl}
                alt={winner!.fullName || "Winner"}
                fill
              />
            </div>
          </div>
          <p className="text-xl font-bold text-yellow-500">
            {winner?.fullName} won!
          </p>
          <p>
            {winner!.fullName} won with a score of {myScore} to {opponentScore}
          </p>
        </div>
        <div className="flex justify-end items-center mt-auto">
          <DialogClose asChild>
            <Button disabled={!gameCreated}>End Game</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default GameOverDialog
