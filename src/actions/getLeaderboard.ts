"use server"

import { DEFAULT_ELO } from "@/lib/defaults"
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
        elo: Number(u.publicMetadata.elo || DEFAULT_ELO).toFixed(0),
      })),
    )
  const users = rawUsers.map((u) => {
    const gamesPlayed = games.filter((g) => g.players.includes(u.id)).length
    const wins = games.filter((g) => g.winners.includes(u.id)).length
    const losses = gamesPlayed - wins
    return {
      ...u,
      wins,
      losses,
    }
  })
  // sort users by highest score
  return users
    .sort((a, b) => b.elo - a.elo)
    .filter((u) => u.wins > 0 || u.losses > 0)
}
