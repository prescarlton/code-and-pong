import getPositionColor from "@/lib/getPositionColor"
import { Crown } from "lucide-react"

interface TopLeaderboardPlayerProps {
  profilePic?: string
  firstName: string
  lastName: string
  position: number
}

const TopLeaderboardPlayer = ({
  profilePic,
  firstName,
  lastName,
  position,
}: TopLeaderboardPlayerProps) => {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-4 ${position === 1 ? "order-2" : position === 2 ? "order-1" : "order-3"}`}
    >
      <div
        className={`${position === 1 ? "w-24" : "w-16"} aspect-square rounded-full bg-blue-200 relative border-2 border-${getPositionColor(position)}`}
      >
        {position === 1 && (
          <Crown className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500 fill-yellow-500" />
        )}
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-${getPositionColor(position)} w-7 aspect-square rounded-full border-2 border-white flex items-center justify-center`}
        >
          {position}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-center">
        <h3 className="font-bold">{firstName}</h3>
        <p className="text-lime-500">3.4k points</p>
      </div>
    </div>
  )
}
export default TopLeaderboardPlayer
