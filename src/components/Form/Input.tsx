import { 
  Dispatch, InputHTMLAttributes, SetStateAction 
} from "react"
import { Copy } from "../Icons"

interface IInputProps extends InputHTMLAttributes<any> {
  label: string,
  setValue?: Dispatch<SetStateAction<any>>
}

export default function Input({ 
  label, setValue, ...rest
}: IInputProps) {
  return (
    <div className="
      flex flex-col gap-y-2
    ">
      <div className="
        flex flex-nowrap gap-x-3
      ">
        <label htmlFor={ rest.id }>{ label }</label>
        { rest.readOnly && rest.value ? Copy(String(rest.value)) : null }
      </div>
      <input 
        { ...rest }
        { ...( 
          !(!setValue || rest.readOnly) ? 
            { onChange: ({ target }) => setValue(target.value) } 
            : {}
        )}
        className={`
          border border-purple-500 rounded-lg
          focus:outline-none bg-gray-100 px-4 py-2
          ${ rest.readOnly ? 'hover:cursor-default pointer-events-none select-none' : 'focus:bg-white' }
        `}
      />
    </div>
  )
}
