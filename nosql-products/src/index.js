const { MongoClient } = require("mongodb");

const cors = require("cors");
const bodyParser = require("body-parser");
const json = bodyParser;
const { expressMiddleware } = require("@apollo/server/express4");

const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServerPluginInlineTrace } = require("@apollo/server/plugin/inlineTrace");
const {  ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");

const express = require("express");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const resolvers = require("./resolvers");
const ProductsAPI = require("./datasources/products-api");
const port = process.env.PORT ?? 4001;
const subgraphName = require("../package.json").name;


const client = new MongoClient(
  'mongodb+srv://workshop-user:federationworkshop1@cluster0.m2kevbh.mongodb.net/?retryWrites=true&w=majority'
);
client.connect();


class ContextValue {
  constructor({ req, server }) {
    const { cache } = server;
    this.dataSources = {
      productsAPI: new ProductsAPI({ 
        cache,
        contextValue: this,
        collection: client.db("ecommerce").collection("products")
      })
    }
  }
}

async function main() {
  const typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
    })
  );

  const app = express();
  const httpServer = createServer(app);

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    context: async ({ req }) => new ContextValue({ req, server })
  });

  await server.start();
  app.use("/", cors(), json(), expressMiddleware(server));

  httpServer.listen(port, () => {
    console.log(`🚀 Subgraph ready at http://localhost:${port}/`);
    console.log(
      `In a new terminal, run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
    );
  });
}

main();
