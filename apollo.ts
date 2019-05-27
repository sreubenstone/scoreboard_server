require("dotenv").config();
import axios from 'axios';
const { gql, withFilter } = require('apollo-server');
const knexConfig = require("./db/knex").development;
const knex = require("knex")(knexConfig);
const { makeExecutableSchema } = require('graphql-tools');


const typeDefs = gql`

  type Game {
      event_info: String
  }


  type Query {
    game(id: String): Game
  }
`;


const resolvers = {
    Query: {
        game: async (parents, args, ctx) => {
            const game = await knex.select().table('events').where({ event_id: args.id })
            const current_time = Date.now()
            const last = new Date(current_time)
            try {
                // SCENARIO A: THERE IS NO DATA IN DATABASE
                if (!game.length) {
                    console.log('inserting')
                    const data = await axios({
                        method: 'get',
                        url: `https://chumley.barstoolsports.com/dev/data/games/${args.id}.json`,
                        responseType: 'json'
                    })
                    const info = data.data
                    const event_info = JSON.stringify(info)
                    const insert = await knex.insert({
                        event_id: args.id,
                        event_info: event_info,
                    }).table('events').returning('*')
                    return {
                        event_info: event_info
                    }
                } else {
                    if (current_time - game[0].last_updated < 15000) {
                        console.log('cache')
                        const event_info = JSON.stringify(game[0].event_info)
                        return {
                            event_info: event_info
                        }
                    }
                    console.log('re-hydrating cache and returning fresh data')
                    const data = await axios({
                        method: 'get',
                        url: `https://chumley.barstoolsports.com/dev/data/games/${args.id}.json`,
                        responseType: 'json'
                    })
                    const info = data.data
                    const event_info = JSON.stringify(info)
                    const insert = await knex.update({
                        event_info: event_info,
                        last_updated: last
                    }).table('events').where({ event_id: args.id }).returning('*')

                    return {
                        event_info: event_info
                    }
                }

            } catch (error) {
                console.log('error:', error)
            }

        }
    }
}


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
