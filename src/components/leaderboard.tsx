import getLeaderboard from "@/actions/getLeaderboard"
import TopLeaderboardPlayer from "./top-leaderboard-player"
import LeaderboardPlayer from "./leaderboard-player"

const Leaderboard = async () => {
  const players = await getLeaderboard()
  const topPlayers = players.slice(0, 3)
  const everybodyElse = players.slice(3)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-evenly items-center">
        {topPlayers.map((player, i) => (
          <TopLeaderboardPlayer
            key={player.id}
            position={i}
            firstName=""
            lastName=""
          />
        ))}
      </div>
      <div className="p-4 w-full flex flex-col gap-2">
        {everybodyElse.map((player, i) => (
          <LeaderboardPlayer
            key={player.id}
            position={i}
            firstName=""
            lastName=""
          />
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
