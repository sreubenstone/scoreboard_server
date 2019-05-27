require("dotenv").config();
import express from 'express';
import schema from './apollo'
import graphqlHTTP from 'express-graphql';
import cron from 'node-cron';
import cors = require("cors");
const knexConfig = require("./db/knex").development;
const knex = require("knex")(knexConfig);


const app = express();

const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true
};

app.use(cors(corsOptions));

app.use(
    "/graphql",
    graphqlHTTP(async req => {
        return {
            schema,
            graphiql: true
        }
    })
);

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on http server.`);
});


