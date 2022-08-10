import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string) {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(collectionName: string): Collection {
    return this.client.db().collection(collectionName);
  },
  map: (data: any) => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id };
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => MongoHelper.map(c));
  },
};
