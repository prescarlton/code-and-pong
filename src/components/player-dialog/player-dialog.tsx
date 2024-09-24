import React, { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface ProfileDialogProps {
  user: {
    id: string
    fullName: string
    imageUrl: string
    elo: number
    wins: number
    losses: number
    gamesPlayed: number
  }
  rank: number

  children: ReactNode
}

export function ProfileDialog({ user, children, rank }: ProfileDialogProps) {
  const totalGames = user.gamesPlayed
  const winPercentage = totalGames > 0 ? (user.wins / totalGames) * 100 : 0
  const gamesNeededForRanking = Math.max(0, 10 - totalGames)
  const isRanked = totalGames >= 10

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Player Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.imageUrl} alt={user.fullName} />
              <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-sm text-muted-foreground">
                {isRanked ? `#${rank} Ranked Player` : "Unranked Player"}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span>ELO Rating</span>
              <span className="font-semibold">
                {isRanked ? user.elo : "Unranked"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Win Percentage</span>
              <span className="font-semibold">{winPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Games Played</span>
              <span className="font-semibold">{totalGames}</span>
            </div>
            <div className="flex justify-between">
              <span>Wins / Losses</span>
              <span className="font-semibold">
                {user.wins} / {user.losses}
              </span>
            </div>
          </div>
          {!isRanked && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Games until ranked</span>
                <span>{gamesNeededForRanking} more</span>
              </div>
              <Progress value={(totalGames / 10) * 100} className="h-2" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
