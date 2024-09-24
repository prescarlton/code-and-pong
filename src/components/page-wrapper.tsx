import { ReactNode } from "react"

interface PageWrapperProps {
  children?: ReactNode
  title?: string
}
const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <main className="flex min-h-screen flex-col items-stretch p-12 py-16 w-full md:max-w-4xl mx-auto gap-8">
      {title && <h1 className="text-4xl font-bold text-center">{title}</h1>}
      {children}
    </main>
  )
}

export default PageWrapper
