"use server"

import { DEFAULT_ELO } from "@/lib/defaults"
import { prisma } from "@/prismaClient"
import { clerkClient } from "@clerk/nextjs/server"

export interface LeaderboardPlayer {
  id: string
  fullName: string
  imageUrl: string
  elo: number
  wins: number
  losses: number
  gamesPlayed: number
}

export default async function getLeaderboard(): Promise<{
  rankedPlayers: LeaderboardPlayer[]
  unrankedPlayers: LeaderboardPlayer[]
}> {
  const games = await prisma.game.findMany({
    where: {
      GameRequest: {
        is: null,
      },
    },
  })

  const rawUsers = await clerkClient.users
    .getUserList({ limit: 200 })
    .then((res) =>
      res.data.map((u) => ({
        id: u.id,
        fullName: u.fullName,
        imageUrl: u.imageUrl,
        elo: Math.round(Number(u.publicMetadata.elo || DEFAULT_ELO)),
      })),
    )
  const users = rawUsers.map((u) => {
    const gamesPlayed = games.filter((g) => g.players.includes(u.id)).length
    const wins = games.filter((g) => g.winners.includes(u.id)).length
    const losses = gamesPlayed - wins
    return {
      ...u,
      fullName: u.fullName || "Anonymous",
      wins,
      losses,
      gamesPlayed,
    }
  })
  const usersWithGames = users.filter((u) => u.gamesPlayed > 0)
  const rankedPlayers = usersWithGames
    .filter((u) => u.gamesPlayed >= 10)
    .sort(
      (a, b) =>
        b.elo - a.elo || b.wins / b.gamesPlayed - a.wins / a.gamesPlayed,
    )
  const unrankedPlayers = usersWithGames
    .filter((u) => u.gamesPlayed < 10)
    .sort(
      (a, b) =>
        b.elo - a.elo || b.wins / b.gamesPlayed - a.wins / a.gamesPlayed,
    )
  return { rankedPlayers, unrankedPlayers }
}
