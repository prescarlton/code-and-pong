"use server"

import { clerkClient } from "@clerk/nextjs/server"

export default async function getLeaderboard() {
  return clerkClient.users.getUserList({ limit: 200 }).then((res) =>
    res.data.map((u) => ({
      id: u.id,
      fullName: u.fullName,
      imageUrl: u.imageUrl,
    })),
  )
}
