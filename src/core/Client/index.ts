import Person, { IPersonConstructor } from './Person'

interface IClienteConstructor extends IPersonConstructor {
  id?: string
}

export default class Client extends Person {
  #id?: string

  constructor({ id = '', name, age }: IClienteConstructor) {
    super({ age, name })
    // (DEV) DEVE SER id
    this.#id = id
  }
  
  get id() {
    return this.#id
  }
}
