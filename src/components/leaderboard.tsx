import getLeaderboard from "@/actions/getLeaderboard"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TrophyIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Badge } from "./ui/badge"

const Leaderboard = async () => {
  const players = await getLeaderboard()
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="items-center">
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          CODE/+/PONG Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead className="w-[450px]">Name</TableHead>
              <TableHead>Wins</TableHead>
              <TableHead>Losses</TableHead>
              <TableHead className="text-right">Win %</TableHead>
              <TableHead className="text-right">ELO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player, index) => {
              const rank = index + 1
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
                <TableRow key={player.id} className={rowClassName}>
                  <TableCell className="font-medium text-center">
                    {isTopThree ? (
                      <Badge
                        variant="default"
                        className={`${
                          rank === 1
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : rank === 2
                              ? "bg-gray-400 hover:bg-gray-500"
                              : "bg-amber-600 hover:bg-amber-700"
                        }`}
                      >
                        {rank}
                      </Badge>
                    ) : (
                      rank
                    )}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {isTopThree && (
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
                      {winPercentage}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {player.elo}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Leaderboard
