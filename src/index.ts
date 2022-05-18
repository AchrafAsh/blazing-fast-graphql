import fs from "fs"
import path from "path"
import express, { Express } from "express"
import { createServer } from "@graphql-yoga/node"
import { makeExecutableSchema } from "@graphql-tools/schema"
import resolvers from "./resolvers"
import createContext from "./context"

const app: Express = express()
const port = 8000

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
})

const graphQLServer = createServer({ schema })

app.use("/graphql", graphQLServer)

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}/graphql`
  )
})
