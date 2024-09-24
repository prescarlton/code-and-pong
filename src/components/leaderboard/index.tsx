import getLeaderboard from "@/actions/get-leaderboard"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import PlayerTable from "./player-table"
import { TrophyIcon } from "lucide-react"

const Leaderboard = async () => {
  const { rankedPlayers, unrankedPlayers } = await getLeaderboard()
  return (
    <div className="w-full mx-auto flex flex-col gap-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <TrophyIcon /> Ranked Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerTable players={rankedPlayers} isRanked />
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            Unranked Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerTable players={unrankedPlayers} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Leaderboard
