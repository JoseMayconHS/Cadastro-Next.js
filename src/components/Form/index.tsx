import { useState } from "react"

import Client from "../../core/Client"
import Button from "../Button"

import Input from "./Input"

interface IFormProps {
  client?: Client
}

export default function Form({ client }: IFormProps) {
  const [name, setName] = useState(client?.name || '')
  const [age, setAge] = useState(client?.age || 0)

  return (
    <div className="
      flex flex-col gap-y-3
    ">
      {
        client?.id ? (
          <Input 
            id='id'
            value={ client.id }
            label='Código'
            readOnly
          />
        ) : null
      }
      <Input 
        id='nome'
        value={ name }
        setValue={ setName }
        label='Nome'
      />
      <Input 
        id='idade'
        value={ age }
        setValue={ setAge }
        label='idade'
      />
      <div className="
        flex flex-nowrap gap-x-3 justify-end
      ">
        <Button color="blue">Salvar</Button>
        <Button color='gray'>Voltar</Button>
      </div>
    </div>
  )
}
