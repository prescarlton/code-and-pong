"use server"

import { prisma } from "@/prismaClient"

export default async function getPlayerStats(playerId: string) {
  const games = await prisma.game.findMany({
    where: {
      players: {
        has: playerId,
      },
    },
  })
  const scoredPoints = await prisma.gameScore.groupBy({
    by: ["scoringUserId"],
    _count: true,
  })
  const scoredAgainstPoints = await prisma.gameScore.groupBy({
    by: ["scoredAgainstUserId"],
    _count: true,
  })

  const pointsScored =
    scoredPoints.find((s) => s.scoringUserId === playerId)?._count || 0
  const pointsScoredAgainst =
    scoredAgainstPoints.find((s) => s.scoredAgainstUserId === playerId)
      ?._count || 0
  const gamesPlayed = games.length
  const rankPoints = Number(
    ((pointsScored / pointsScoredAgainst) * gamesPlayed).toPrecision(2),
  )
  const gamesWon = games.filter((g) => g.winners.includes(playerId)).length
  const gamesLost = gamesPlayed - gamesWon
  const winLossRatio = (gamesWon / (gamesLost || 1)).toPrecision(3)
  return {
    rankPoints,
    points: pointsScored,
    gamesPlayed,
    gamesWon,
    gamesLost,
    winLossRatio,
  }
}
