require('dotenv').config()

const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");

const resolvers = require("./resolvers");
const CustomerDB = require("./datasources/customer-db");
const port = process.env.PORT ?? 4003;
const subgraphName = require("../package.json").name;

const knexConfig = {
  client: 'mysql2',
  connection: {
    host: '34.75.163.58',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'customer'
  }
}

class ContextValue {
 constructor({ req, server }) {
   const { cache } = server;
   this.dataSources = {
     customerDB: new CustomerDB({
      config: knexConfig,
      cache,
      contextValue: this
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
