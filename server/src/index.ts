import express, { Express, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
const cors = require("cors");
import { connectDB } from "./config/db";
const schema = require("./resolvers");
dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

//  Connect to DataBase
connectDB();

// middleware
app.use(cors());

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
