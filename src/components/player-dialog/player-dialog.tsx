import { ReactNode } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { clerkClient } from "@clerk/nextjs/server"
import getPlayerStats from "@/actions/get-player-stats"
import { DEFAULT_ELO } from "@/lib/defaults"

interface PlayerDialogProps {
  children: ReactNode
  playerId: string
}

const PlayerDialog = async ({ children, playerId }: PlayerDialogProps) => {
  const user = await clerkClient.users.getUser(playerId)
  const stats = await getPlayerStats(playerId)
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{`${user.firstName}'s Stats`}</DialogTitle>
        <div className="flex flex-col gap-2 items-center">
          <img src={user.imageUrl} className="rounded-full w-24 h-24" />
          <p>
            {Number(user.publicMetadata.elo || DEFAULT_ELO).toPrecision(3)} ELO
          </p>
          <p>{stats.points} points</p>
          <p>{stats.winLossRatio} W/L Ratio</p>
          <p>
            {stats.gamesWon} Wins / {stats.gamesLost} Losses
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default PlayerDialog
