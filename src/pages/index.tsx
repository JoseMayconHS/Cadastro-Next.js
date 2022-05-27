import { useCallback, useEffect, useState } from "react"

import Client from "../core/Client"

import Layout from "../components/Layout"
import Table, { 
  THandles as THandlesTable 
} from "../components/Table"
import Button from "../components/Button"
import Form from "../components/Form"
import ClientCollection from "../backend/db/ClientCollection"

export default function Home() {
  const repo: ClientCollection =  new ClientCollection()

  const [clients, setClients] = useState<Client[]>([])
  const [data, setData] = useState<Client | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const clients = await repo.getAll()

      setClients(clients)

      setLoading(false)
    }

    init()
  }, [])

  const _handleEdit: THandlesTable = useCallback((client) => {
    setData(client)
  }, [data])

  const _handleRemove: THandlesTable = useCallback(async (client) => {
    try {
      await repo.remove(client)

      setClients(oldState =>  oldState.filter(({ id }) => id !== client.id))
    } catch(e) {
      console.error(e)
      // (DEV) TOAST NOTIFICATION AVISANDO QUE OCORREU UM ERRO
    }
  }, [])

  const _handleSubmit: (client: Client) => Promise<void> = useCallback(async (client) => {
    const response = await repo.save(client)

    response && setClients(oldState => {
      const newState = [ ...oldState ]

      if (client.id) {
        const index = oldState.findIndex(({ id }) => id === client.id)

        newState[index] = client
      } else {
        newState.unshift(response)
      }

      return newState
    })

    setData(undefined)
  }, [])

  return (
    <Layout title="Cadastro simples">
      {
        data ? (
          <Form 
            client={ data } 
            _handleBack={ () => setData(undefined) }
            _handleSubmit={ _handleSubmit }
          />
        ) : (
          <>
            <div className="
              flex justify-end mb-4
            ">
              <Button color='green' 
                onClick={() => setData(new Client({ name: '', age: 0 }))}
              >Novo cliente</Button>
            </div>
            <Table 
              clients={ clients } loading={ loading }
              _handleEdit={ _handleEdit } _handleRemove={ _handleRemove } 
            />
          </>
        )
      }
    </Layout>
  )
}
