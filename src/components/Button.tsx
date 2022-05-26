import { ReactNode } from "react"

interface IButtonProps {
  color?: 'green' | 'red' | 'blue' | 'gray',
  children: ReactNode,
  className?: string
}

export default function Button({ color = 'gray', children, className = '' }: IButtonProps) {
  return (
    <button className={`
      bg-gradient-to-r from-${ color }-400 to-${ color }-700
      text-white px-4 py-2 rounded-md ${ className }
    `}>
      { children }
    </button>
  )
}
