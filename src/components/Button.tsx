import { ButtonHTMLAttributes, ReactNode } from "react"

interface IButtonProps extends ButtonHTMLAttributes<any> {
  color?: 'green' | 'red' | 'blue' | 'gray',
  children: ReactNode,
  className?: string
}

export default function Button({ color = 'gray', children, className = '', ...rest }: IButtonProps) {
  return (
    <button className={`
      bg-gradient-to-r from-${ color }-400 to-${ color }-700
      text-white px-4 py-2 rounded-md ${ className }
    `} { ...rest }>
      { children }
    </button>
  )
}
