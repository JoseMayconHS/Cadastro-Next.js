import Client from './'

export default interface Repo {
  save(client: Client): Promise<Client | undefined>,
  remove(client: Client): Promise<void>,
  getAll(): Promise<Client[]>
}
