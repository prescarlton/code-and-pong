import ActionMenu from "@/components/action-menu"
import Leaderboard from "@/components/leaderboard"
import PageWrapper from "@/components/page-wrapper"
import { LoaderCircle } from "lucide-react"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <PageWrapper>
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
