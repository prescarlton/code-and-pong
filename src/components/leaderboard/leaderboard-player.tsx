import { ProfileDialog } from "../player-dialog/player-dialog"
import { TableCell, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { TrophyIcon } from "lucide-react"
import { LeaderboardPlayer } from "@/actions/get-leaderboard"
import clsx from "clsx"
interface LeaderboardPlayerProps {
  player: LeaderboardPlayer
  rank: number
  isRanked?: boolean
}
const LeaderboardPlayerRow = ({
  player,
  rank,
  isRanked,
}: LeaderboardPlayerProps) => {
  const winPercentage = Math.round(
    (player.wins / (player.wins + player.losses)) * 100,
  )

  const isTopThree = rank <= 3
  const rowClassName = isTopThree
    ? `bg-opacity-10 ${
        rank === 1
          ? "bg-yellow-500"
          : rank === 2
            ? "bg-gray-400"
            : "bg-amber-600"
      }`
    : ""
  return (
    <ProfileDialog user={player} rank={rank}>
      <TableRow
        className={clsx(
          isRanked && rowClassName,
          "appearance-none cursor-pointer",
        )}
      >
        <TableCell className="font-medium ">
          {isRanked ? (
            <Badge
              variant="default"
              className={`${
                rank === 1
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : rank === 2
                    ? "bg-gray-400 hover:bg-gray-500"
                    : rank === 3
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "bg-transparent text-black"
              }`}
            >
              {rank}
            </Badge>
          ) : (
            rank
          )}
        </TableCell>
        <TableCell className="flex items-center gap-2">
          {isRanked && isTopThree && (
            <TrophyIcon
              className={`w-4 h-4 ${
                rank === 1
                  ? "text-yellow-500"
                  : rank === 2
                    ? "text-gray-400"
                    : "text-amber-600"
              }`}
            />
          )}
          {player.fullName}
        </TableCell>
        <TableCell>{player.wins}</TableCell>
        <TableCell>{player.losses}</TableCell>
        <TableCell className="text-right">
          <Badge
            variant="default"
            className={
              winPercentage >= 75
                ? "bg-lime-500"
                : winPercentage >= 50
                  ? "bg-orange-500"
                  : "bg-destructive"
            }
          >
            {winPercentage || 0}%
          </Badge>
        </TableCell>
        <TableCell className="text-right font-semibold">{player.elo}</TableCell>
        {!isRanked && (
          <TableCell className="text-right">
            {10 - player.gamesPlayed}
          </TableCell>
        )}
      </TableRow>
    </ProfileDialog>
  )
}
export default LeaderboardPlayerRow
