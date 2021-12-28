import { MongoClient } from "mongodb"
const url = 'mongodb://lan_backend:lan_backend123@db1.silotech.vn:28000,db2.silotech.vn:28000,db3.silotech.vn:28000/?replicaSet=replicaset-remote&authSource=admin';
const dbName = 'web3';

let mongoClient: MongoClient

export let BusdCollection: any

export const connectMongo = async () => {
  try {
    mongoClient = new MongoClient(url);
    await mongoClient.connect();
    const db = await mongoClient.db(dbName)

    BusdCollection = await db.collection('busd')

    console.log('💾 Connected successfully to mongodb');
  } catch (error) {
    console.log('Mongodb: Disconnected');
    await mongoClient?.close(true)
    setTimeout(connectMongo, 1000)
    throw error
  }
}
