import firebase  from '../firebase'

import Repo from '../../core/Client/Repo'
import Client, { IClienteConstructor } from '../../core/Client'

export default class ClientCollection implements Repo {

  #conversor = {
    toFirestore(client: Client): IClienteConstructor {
      const { age, name } = client

      return {
        age, name
      }
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Client {
      const data = snapshot.data(options)

      return new Client({ name: data.name, age: data.age, id: snapshot.id })
    }
  }
  
  async save(client: Client): Promise<Client | undefined> {
    if (client?.id) {
      // (DESC) ATUALIZAR UM CLIENTE
      await this.#collection()
        .doc(client.id)
        .set(client)

      return client
    }

    // (DESC) SALVAR UM CLIENTE
    const docRef = await this.#collection()
      .add(client)

    const doc = await docRef.get()

    return doc.data()
  }

  async remove(client: Client): Promise<void> {
    await this.#collection()
      .doc(client.id)
      .delete()
  }

  async getAll(): Promise<Client[]> {
    const query = await this.#collection()
      .get()

    return query.docs.map(doc => doc.data()) ?? []
  }

  #collection() {
    return firebase
      .firestore()
      .collection('Clients')
      .withConverter(this.#conversor)
  }
}
