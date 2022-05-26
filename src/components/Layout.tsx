import { ReactNode } from "react"
import Title, { ITitleProps } from "./Title"

interface ILayoutProps extends ITitleProps {
  children: ReactNode
}

export default function Layout({ title, children }: ILayoutProps) {
  return (
    <div className="
      flex flex-col w-screen max-w-3xl justify-center
      bg-white text-gray-800 rounded-md
    ">
      <Title title={ title } />
      <div className="
        p-6
      ">
        { children }
      </div>
    </div>
  )
}