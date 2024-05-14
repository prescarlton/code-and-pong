import ActionMenu from "@/components/action-menu"
import Leaderboard from "@/components/leaderboard"
import PageWrapper from "@/components/page-wrapper"
import Topbar from "@/components/topbar"
import { LoaderPinwheel } from "lucide-react"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <Topbar />
      <PageWrapper title="Leaderboard">
        <Suspense fallback={<LoaderPinwheel className="animate-spin" />}>
          <Leaderboard />
        </Suspense>
      </PageWrapper>
      <ActionMenu />
    </>
  )
}
