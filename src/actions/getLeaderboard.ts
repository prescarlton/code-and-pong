"use server"

import { prisma } from "@/prismaClient"
import { clerkClient } from "@clerk/nextjs/server"

export default async function getLeaderboard() {
  const scoredPoints = await prisma.gameScore.groupBy({
    by: ["scoringUserId"],
    _count: true,
  })
  const scoredAgainstPoints = await prisma.gameScore.groupBy({
    by: ["scoredAgainstUserId"],
    _count: true,
  })
  const games = await prisma.game.findMany({})

  const rawUsers = await clerkClient.users
    .getUserList({ limit: 200 })
    .then((res) =>
      res.data.map((u) => ({
        id: u.id,
        fullName: u.fullName,
        imageUrl: u.imageUrl,
      })),
    )
  const users = rawUsers.map((u) => {
    const pointsScored =
      scoredPoints.find((s) => s.scoringUserId === u.id)?._count || 0
    const pointsScoredAgainst =
      scoredAgainstPoints.find((s) => s.scoredAgainstUserId === u.id)?._count ||
      1
    const gamesPlayed = games.filter((g) => g.players.includes(u.id)).length
    const rankPoints = Number(
      ((pointsScored / pointsScoredAgainst) * gamesPlayed).toPrecision(2),
    )
    return {
      ...u,
      rankPoints,
      points: pointsScored,
    }
  })
  // sort users by highest score
  return users.sort((a, b) => b.rankPoints - a.rankPoints)
}
