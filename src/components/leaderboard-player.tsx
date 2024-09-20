import PlayerDialog from "./player-dialog/player-dialog"
import { Card } from "./ui/card"
interface LeaderboardPlayerProps {
  profilePic?: string
  fullName: string
  position: number
  gamesWon: number
  gamesLost: number
  playerId: string
}
const LeaderboardPlayer = ({
  fullName,
  position,
  gamesWon,
  gamesLost,
  playerId,
}: LeaderboardPlayerProps) => {
  return (
    <PlayerDialog playerId={playerId}>
      <Card className={`rounded-full px-8 py-4 flex items-center gap-2`}>
        <p className="text-xl font-bold">{position}</p>
        <p>{fullName.split(" ")[0]}</p>
        <p className="ml-auto">
          {gamesWon} - {gamesLost}
        </p>
      </Card>
    </PlayerDialog>
  )
}
export default LeaderboardPlayer
