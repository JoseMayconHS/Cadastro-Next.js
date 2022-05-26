import { useCallback, useState } from "react"

import Client from "../core/Client"

import Layout from "../components/Layout"
import Table, { 
  THandles as THandlesTable 
} from "../components/Table"
import Button from "../components/Button"
import Form from "../components/Form"
import Link from "next/link"

export default function Home() {
  const clients = [
    new Client({ id: '2', name: 'Maycon', age: 22 }),
    new Client({ id: '3', name: 'Ana', age: 19 }),
    new Client({ id: '4', name: 'João', age: 29 })
  ]

  const [data, setData] = useState<Client | undefined>()

  const _handleEdit: THandlesTable = useCallback((client) => {
    setData(client)
  }, [data])

  const _handleRemove: THandlesTable = useCallback((client) => {
    console.log(client.name)
  }, [])

  return (
    <Layout title="Cadastro simples">
      {
        data ? (
          <Form client={ data } _handleBack={ () => setData(undefined) } />
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
