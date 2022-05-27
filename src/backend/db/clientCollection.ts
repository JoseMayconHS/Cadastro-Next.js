import { 
  Firestore, FirestoreDataConverter,
  getFirestore, collection, getDocs, deleteDoc, getDoc, updateDoc, addDoc, doc
} from 'firebase/firestore/lite'

import firebase  from '../firebase'

import Repo from '../../core/Client/Repo'
import Client, { IClienteConstructor } from '../../core/Client'

export default class ClientCollection implements Repo {
  #db: Firestore

  #conversor: FirestoreDataConverter<any> = {
    toFirestore(client: Client): IClienteConstructor {
      const { age, name } = client

      return {
        age, name
      }
    },
    fromFirestore(snapshot): Client {
      const data = snapshot.data()

      return new Client({ name: data.name, age: data.age, id: snapshot.id })
    }
  }

  constructor() {
    this.#db = getFirestore(firebase)
  }

  async save(client: Client): Promise<Client> {
    const colletionRefecence = this.#collection()

    if (client?.id) {
      // (DESC) ATUALIZAR UM CLIENTE

      const docRef = doc(colletionRefecence, client.id)

      await updateDoc(docRef, client.object())
        
      return client
    }

    // (DESC) SALVAR UM CLIENTE
    const docRef = await addDoc(colletionRefecence, client)

    const data = await getDoc(docRef)

    return new Client({ ...client.object(), id: data.id })
  }

  async remove(client: Client): Promise<void> {    
    if (client.id) {
      const colletionRefecence = this.#collection()

      const docRef = doc(colletionRefecence, client.id)
      
      await deleteDoc(docRef)
    }
  }

  async getAll(): Promise<Client[]> {
    const colletionRefecence = this.#collection()

    const docs = await getDocs(colletionRefecence)

    return docs.docs.map(doc => doc.data()) ?? []
  }

  #collection() {
    const query = collection(this.#db, 'Clients')

    return query.withConverter<Client>(this.#conversor)
  }
}
