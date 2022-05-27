import { useCallback, useEffect, useState } from "react"

import Client from "../core/Client"

import Layout from "../components/Layout"
import Table, { 
  THandles as THandlesTable 
} from "../components/Table"
import Button from "../components/Button"
import Form from "../components/Form"
import Link from "next/link"
import ClientCollection from "../backend/db/clientCollection"

export default function Home() {
  const repo: ClientCollection =  new ClientCollection()

  const [clients, setClients] = useState<Client[]>([])
  const [data, setData] = useState<Client | undefined>()

  useEffect(() => {
    const init = async () => {
      const clients = await repo.getAll()

      setClients(clients)
    }

    init()
  }, [])

  const _handleEdit: THandlesTable = useCallback((client) => {
    setData(client)
  }, [data])

  const _handleRemove: THandlesTable = useCallback(async (client) => {
    console.log('Remover ',client.name)
    await repo.remove(client)
  }, [])

  const _handleSubmit: (client: Client) => Promise<void> = useCallback(async (client) => {
    console.log('Salvar ou alterar ',client.name)
    await repo.save(client)
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
              clients={ clients } 
              _handleEdit={ _handleEdit } _handleRemove={ _handleRemove } 
            />
          </>
        )
      }
    </Layout>
  )
}
