"use client"
import listUsers, { ShortUser } from "@/actions/listUsers"
import GameOverDialog from "@/components/game-over-dialog"
import PageWrapper from "@/components/page-wrapper"
import ScoreCard from "@/components/score-card"
import Topbar from "@/components/topbar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { useState } from "react"
import useSWR from "swr"

export default function ScoreKeeperPage() {
  const [myScore, setMyScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [gameState, setGameState] = useState<
    "ready" | "in-progress" | "ended" | "loading"
  >("ready")
  const [opponent, setOpponent] = useState<null | ShortUser>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: users, isLoading: usersLoading } = useSWR(
    "list-users",
    listUsers,
  )
  // game status logic
  if (opponent && gameState === "ready") {
    setGameState("in-progress")
  }
  const resetScore = async () => {
    setMyScore(0)
    setOpponentScore(0)
    setOpponent(null)
    setGameState("ready")
  }

  // check for scores to see if game is over
  const iWonGame = myScore >= 11 && myScore - opponentScore >= 2
  const oppWonGame = opponentScore >= 11 && opponentScore - myScore >= 2

  if (
    (iWonGame || oppWonGame) &&
    gameState === "in-progress" &&
    !isDialogOpen
  ) {
    setIsDialogOpen(true)
    // setGameState("ended")
  }
  const closeDialog = () => {
    setIsDialogOpen(false)
    resetScore()
  }

  return (
    <>
      <Topbar />
      <PageWrapper title="Score Keeper">
        <div className="flex-1 flex flex-col gap-4">
          {gameState === "ready" ? (
            usersLoading ? (
              <p className="flex-1">Loading...</p>
            ) : (
              <div className="flex flex-col flex-1 gap-2">
                <p>Select an opponent to get started</p>
                {users?.length ? (
                  <Select
                    onValueChange={(id) =>
                      setOpponent(users.find((user) => user.id === id)!)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select opponent" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex flex-row items-center gap-2">
                            <div className="w-8 h-8 rounded-full relative overflow-hidden">
                              <Image
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                fill
                              />
                            </div>
                            <p>{user.fullName}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p>No Opponents found</p>
                )}
              </div>
            )
          ) : gameState === "in-progress" && opponent ? (
            <>
              <ScoreCard
                playerName="me"
                score={myScore}
                setScore={setMyScore}
              />
              <ScoreCard
                playerName={opponent.fullName || "Opponent"}
                score={opponentScore}
                setScore={setOpponentScore}
              />
              <GameOverDialog
                isOpen={isDialogOpen}
                close={closeDialog}
                myScore={myScore}
                opponentScore={opponentScore}
                opponent={opponent}
              />
            </>
          ) : (
            <p>
              {
                "Not sure what happened here. Probably should've spent more time on error handling instead of confetti."
              }
            </p>
          )}
        </div>
      </PageWrapper>
    </>
  )
}
