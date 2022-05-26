
export interface ITitleProps {
  title: string
}

export default function Title({ title }: ITitleProps) {
  return (
    <div className="
      flex flex-col justify-center
    ">
      <h1 className="
        px-7 py-2
      ">
        { title }
      </h1>
      <hr 
        className="
          border-2 border-purple-500
        "
      />
    </div>
  )
}
