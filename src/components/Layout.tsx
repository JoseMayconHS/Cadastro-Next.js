import { ComponentProps } from "react"
import Title, { ITitleProps } from "./Title"

interface ILayoutProps extends ITitleProps {

}

export default function Layout({ title, children }: ComponentProps<keyof ILayoutProps>) {
  return (
    <div className="
      flex flex-col w-2/3 justify-center
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