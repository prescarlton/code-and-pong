import getLeaderboard from "@/actions/getLeaderboard"
import TopLeaderboardPlayer from "./top-leaderboard-player"
import LeaderboardPlayer from "./leaderboard-player"

const Leaderboard = async () => {
  const players = await getLeaderboard()
  const topPlayers = players.slice(0, 3)
  const everybodyElse = players.slice(3)
  return (
    <div className="flex flex-col gap-2">
      {players.length === 0 && (
        <p className="text-center">No games have been played yet.</p>
      )}
      <div className="flex flex-row justify-evenly items-center">
        {topPlayers.map((player, i) => (
          <TopLeaderboardPlayer
            key={player.id}
            position={i + 1}
            fullName={player.fullName}
            profilePic={player.imageUrl}
            gamesWon={player.gamesWon}
            gamesLost={player.gamesLost}
            playerId={player.id}
          />
        ))}
      </div>
      <div className="p-4 w-full flex flex-col gap-2">
        {everybodyElse.map((player, i) => (
          <LeaderboardPlayer
            key={player.id}
            position={i + 4}
            fullName={player.fullName!}
            profilePic={player.imageUrl}
            gamesWon={player.gamesWon}
            gamesLost={player.gamesLost}
            playerId={player.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
