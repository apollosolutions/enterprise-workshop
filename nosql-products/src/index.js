const { MongoClient } = require("mongodb");

const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServerPluginInlineTrace } = require("@apollo/server/plugin/inlineTrace");

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

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    instrospection: true
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => new ContextValue({ req, server }),
    listen: {
      port 
    },
  });

  console.log(`🚀  Subgraph ready at ${url}`);
  console.log(
    `In a new terminal, run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
  );
}

main();
