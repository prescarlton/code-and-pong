"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

export interface ShortUser {
  id: string
  fullName: string | null
  imageUrl: string
}

export default async function listUsers() {
  const { userId } = auth()
  return clerkClient.users.getUserList({ limit: 200 }).then((res) => {
    return res.data
      .map((u) => ({
        id: u.id,
        fullName: u.fullName,
        imageUrl: u.imageUrl,
      }))
      .filter((u) => u.id !== userId)
  })
}
