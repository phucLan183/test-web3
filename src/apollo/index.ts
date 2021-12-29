import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs } from "./typeDefs/schema";
import { resolvers } from "./resolvers";

export const startApolloServer = async (PORT: any) => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      debug: true
    })

    const { url } = await server.listen({ port: PORT })
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    throw error
  }
}