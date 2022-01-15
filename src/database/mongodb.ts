import { MongoClient } from "mongodb"

export let mongoClient: MongoClient

export let PrlCollection: any

export const connectMongo = async (MONGO_URI: any) => {
  try {
    mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();

    mongoClient.on('error', async (e) => {
      try {
        await mongoClient.close()
        await connectMongo(MONGO_URI)
      } catch (e) {
        setTimeout(connectMongo, 1000)
        throw e
      }
    })

    mongoClient.on('timeout', async () => {
      try {
        await mongoClient.close()
        await connectMongo(MONGO_URI)
      } catch (e) {
        setTimeout(connectMongo, 1000)
        throw e
      }
    })

    const db = mongoClient.db()

    PrlCollection = db.collection('parallel')

    console.log('💾 Connected successfully to mongodb');
  } catch (error) {
    console.log('Mongodb: Disconnected');
    await mongoClient?.close(true)
    setTimeout(connectMongo, 1000)
    throw error
  }
}
