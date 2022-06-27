import express, { Express, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
const schema = require("./schema");
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("GraphQL Server");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => console.log(`Server running on ... ${port}`));
