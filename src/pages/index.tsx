import { useCallback } from "react"

import Client from "../core/Client"

import Layout from "../components/Layout"
import Table, { 
  THandles as THandlesTable 
} from "../components/Table"
import Button from "../components/Button"
import Form from "../components/Form"

export default function Home() {
  const clients = [
    new Client({ id: '2', name: 'Maycon', age: 22 }),
    new Client({ id: '3', name: 'Ana', age: 19 }),
    new Client({ id: '4', name: 'João', age: 29 })
  ]

  const _handleEdit: THandlesTable = useCallback((client) => {
    console.log(client.name)
  }, [])

  const _handleRemove: THandlesTable = useCallback((client) => {
    console.log(client.name)
  }, [])

  return (
    <div className={`
      flex justify-center items-center 
      h-screen bg-gradient-to-r from-blue-500 to-purple-500 
      text-white font-semibold
    `}>
      <Layout title="Cadastro simples">
        <div className="
          flex justify-end mb-4
          ">
          <Button color='green'>Novo cliente</Button>
        </div>
        <Form client={ clients[0] } />
        {/* <Table 
          clients={ clients } 
          _handleEdit={ _handleEdit } _handleRemove={ _handleRemove } 
        /> */}
      </Layout>
    </div>
  )
}
