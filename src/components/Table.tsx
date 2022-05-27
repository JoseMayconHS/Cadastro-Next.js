import { useCallback } from "react"

import Client from "../core/Client"

import { Edit, Loading, Trash } from './Icons'

export type THandles = (client: Client) => Promise<void> | void

interface ITableProps {
  loading: boolean,
  clients?: Client[],
  _handleEdit?: THandles,
  _handleRemove?: THandles,
}

export default function Table({ 
  loading, clients = [], 
  _handleEdit, _handleRemove 
}: ITableProps) {

  const showActions = _handleEdit || _handleRemove

  const _renderHeader = useCallback(() => {
    const styles = `text-left p-4`

    return (
      <tr>
        <th className={ styles }>Código</th>
        <th className={ styles }>Nome</th>
        <th className={ styles }>Idade</th>
        {
          showActions ? (
            <th className={ styles }>Ações</th>
          ) : null
        }
      </tr>
    )
  }, [])

  const _renderActions = useCallback((client: Client) => {
    const styles = `flex justify-center items-center rounded-full p-2 hover:bg-purple-50 `

    return (
      <td className="text-left p-4 flex flex-nowrap gap-x-5">
        {
          _handleEdit ? (
            <button className={ styles + 'text-green-600' }
            onClick={() => _handleEdit(client) }
            ><Edit /></button>
          ) : null
        }
        {
          _handleRemove ? (
            <button className={ styles + 'text-red-500' }
              onClick={() => _handleRemove(client) }
            ><Trash /></button>
          ) : null
        }
      </td>
    )
  }, [])

  const _renderList = useCallback(() => {
    const styles = `text-left p-4`

    if (loading || !clients.length) {
      return (
        <tr>
          <td colSpan={ showActions ? 4 : 3 } 
            className="
             bg-purple-200 p-4
            "
          >
            <div className="flex justify-center">
              {
                loading ? (
                  <Loading />
                ) : (
                  <span>Nenhum cadastro</span>
                )
              }
            </div>
          </td>
        </tr>
      )
    }

    return clients?.map((client, i) => {
      const { id, name, age } = client

      return (
        <tr key={ id } className={`
          ${ i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100' }
        `}>
          <td className={ styles }>{ id }</td>
          <td className={ styles }>{ name }</td>
          <td className={ styles }>{ age }</td>
          { showActions ? _renderActions(client) : null }
        </tr>
      )
    })
  }, [clients, loading])

  return (
    <table className="
      w-full rounded-xl overflow-hidden
    ">
      <thead
        className="
          bg-gradient-to-r from-purple-500 to-purple-800
          text-gray-100
        "
      >
        { _renderHeader() }
      </thead>
      <tbody>
        { _renderList() }
      </tbody>
    </table>
  )
}
