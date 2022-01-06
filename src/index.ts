import { saveDatabase } from './service'
import { connectMongo } from './database/mongodb';
import { connectWeb3 } from './web3';
import { PORT, MONGO_URI, API_ADDRESS, STARTBLOCK } from './config'
import { startApolloServer} from './apollo'

(async () => {
  try {
    await connectMongo(MONGO_URI)
    connectWeb3(API_ADDRESS)
    await saveDatabase(STARTBLOCK)
    await startApolloServer(PORT)
  } catch (error) {
    console.log(error);
  }
})()

