"use server"

import { prisma } from "@/prismaClient"
import { clerkClient } from "@clerk/nextjs/server"

export default async function getLeaderboard() {
  const games = await prisma.game.findMany({})

  const rawUsers = await clerkClient.users
    .getUserList({ limit: 200 })
    .then((res) =>
      res.data.map((u) => ({
        id: u.id,
        fullName: u.fullName,
        imageUrl: u.imageUrl,
        elo: Number(u.publicMetadata.elo) || 400,
      })),
    )
  const users = rawUsers.map((u) => {
    const gamesPlayed = games.filter((g) => g.players.includes(u.id)).length
    const gamesWon = games.filter((g) => g.winners.includes(u.id)).length
    const gamesLost = gamesPlayed - gamesWon
    return {
      ...u,
      gamesWon,
      gamesLost,
    }
  })
  // sort users by highest score
  return users.sort((a, b) => b.elo - a.elo)
}
