import ActionMenu from "@/components/action-menu"
import Leaderboard from "@/components/leaderboard"
import PageWrapper from "@/components/page-wrapper"
import Topbar from "@/components/topbar"
import { auth } from "@clerk/nextjs/server"
import { LoaderCircle } from "lucide-react"
import { Suspense } from "react"

export default function Home() {
  const { sessionId } = auth()
  return (
    <>
      <Topbar isSignedIn={Boolean(sessionId)} />
      <PageWrapper title="Leaderboard">
        <Suspense
          fallback={
            <LoaderCircle className="animate-spin mx-auto mt-4 w-12 h-12" />
          }
        >
          <Leaderboard />
        </Suspense>
      </PageWrapper>
      <ActionMenu />
    </>
  )
}
