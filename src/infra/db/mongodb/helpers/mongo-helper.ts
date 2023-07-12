import { type Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  dbName: null as unknown as string,

  async connect (dbName: string, uri: string): Promise<void> {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.dbName, this.uri)
    }

    return this.client.db(this.dbName).collection(name)
  },

  map: async <T>(data: any): Promise<T> => {
    const { _id, ...accountWithoutId } = data

    return Object.assign({}, accountWithoutId, { id: _id })
  },

  convertId (id: string): ObjectId {
    return new ObjectId(id)
  }
}
