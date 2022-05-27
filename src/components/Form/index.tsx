import { useCallback, useRef, useState } from "react"

import Client from "../../core/Client"
import Button from "../Button"

import Input from "./Input"

interface IFormProps {
  client?: Client,
  _handleBack(): void,
  _handleSubmit(client: Client): Promise<void>
}

export default function Form({ client, _handleBack, _handleSubmit }: IFormProps) {
  const [name, setName] = useState(client?.name || '')
  const [age, setAge] = useState(client?.age || 1)

  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputAgeRef = useRef<HTMLInputElement>(null)

  const _handleSave = useCallback(() => {
    if (client?.id) {
      // (DESC) SE FOR PARA ATUALIZAR UM CLIENTE
      const newClient = new Client({ id: client.id, name, age })
      
      console.log('Alter ', newClient)
      
      return _handleSubmit(newClient)
    }

    // (DESC) SE FOR PARA CADASTRAR UM NOVO CLIENTE

    if (name === '' || !+age) {
      if (name === '') 
        return inputNameRef.current?.focus()

      return inputAgeRef.current?.focus()
    }

    const data = new Client({ name, age })

    console.log('Criar ', data)
    _handleSubmit(data)
  }, [name, age, inputAgeRef, inputNameRef])

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
        ref={ inputNameRef }
        />
      <Input 
        id='idade'
        type='number'
        min={1}
        value={ age }
        setValue={ setAge }
        label='Idade'
        ref={ inputAgeRef }
      />
      <div className="
        flex flex-nowrap gap-x-3 justify-end
      ">
        <Button color="blue" onClick={ _handleSave }>{ client?.id ? 'Alterar' : 'Salvar' }</Button>
        <Button color='gray' onClick={ _handleBack }>Voltar</Button>
      </div>
    </div>
  )
}
