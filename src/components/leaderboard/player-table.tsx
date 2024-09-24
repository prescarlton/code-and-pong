import { LeaderboardPlayer } from "@/actions/get-leaderboard"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import LeaderboardPlayerRow from "./leaderboard-player"

interface PlayerTableProps {
  players: LeaderboardPlayer[]
  isRanked?: boolean
}

export default function PlayerTable({ players, isRanked }: PlayerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead className="w-[400px]">Name</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Losses</TableHead>
          <TableHead className="text-right">Win %</TableHead>
          <TableHead className="text-right">ELO</TableHead>
          {!isRanked && (
            <TableHead className="text-right w-[200px]">
              Games to Rank
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => {
          return (
            <LeaderboardPlayerRow
              key={player.id}
              rank={index + 1}
              player={player}
              isRanked={isRanked}
            />
          )
        })}
      </TableBody>
    </Table>
  )
}
