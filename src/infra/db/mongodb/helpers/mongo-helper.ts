import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: async <T>(collection: any, data: any): Promise<T> => {
    const _id = collection.insertedId.id[0]

    return await new Promise<T>(resolve => {
      const mappedObject: T = {
        id: _id.toString(),
        ...data
      }

      resolve(mappedObject)
    })
  }
}
