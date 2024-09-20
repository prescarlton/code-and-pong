import getPositionColor from "@/lib/getPositionColor"
import { Crown } from "lucide-react"
import Image from "next/image"
import PlayerDialog from "./player-dialog/player-dialog"

interface TopLeaderboardPlayerProps {
  profilePic?: string
  fullName: string | null
  position: number
  gamesWon: number
  gamesLost: number
  playerId: string
}

const TopLeaderboardPlayer = ({
  profilePic,
  fullName,
  position,
  gamesWon,
  gamesLost,
  playerId,
}: TopLeaderboardPlayerProps) => {
  return (
    <PlayerDialog playerId={playerId}>
      <div
        className={`flex flex-1 flex-col items-center gap-4 ${position === 1 ? "order-2" : position === 2 ? "order-1" : "order-3"}`}
      >
        <div
          className={`${position === 1 ? "w-24" : "w-16"} aspect-square rounded-full bg-blue-200 relative border-2 border-${getPositionColor(position)}`}
        >
          {position === 1 && (
            <Crown className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500 fill-yellow-500 z-20" />
          )}
          <div
            className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-${getPositionColor(position)} w-7 aspect-square rounded-full border-2 border-white flex items-center justify-center z-20`}
          >
            {position}
          </div>
          {profilePic && (
            <Image
              src={profilePic}
              fill
              alt={fullName || "Profile"}
              className="rounded-full z-10"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 text-center ">
          <h3 className="font-bold">{fullName?.split(" ")[0]}</h3>
          <p className="text-gray-400">
            {gamesWon} - {gamesLost}
          </p>
        </div>
      </div>
    </PlayerDialog>
  )
}
export default TopLeaderboardPlayer
