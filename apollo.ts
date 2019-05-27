require("dotenv").config();
import axios from 'axios';
const { gql, withFilter } = require('apollo-server');
const knexConfig = require("./db/knex").development;
const knex = require("knex")(knexConfig);
const { makeExecutableSchema } = require('graphql-tools');


const typeDefs = gql`

  type Game {
    id: Int
    event_id: String
    status: String
    home_team_name: String
    home_scores: String
    away_team_name: String
    away_scores: String
    league: String
    home_hits: Int
    home_runs: Int
    home_errors: Int
    away_hits: Int
    away_runs: Int
    away_errors: Int
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
                if (!game.length) {
                    console.log('inserting')
                    const data = await axios({
                        method: 'get',
                        url: `https://chumley.barstoolsports.com/dev/data/games/${args.id}.json`,
                        responseType: 'json'
                    })
                    const info = data.data
                    const status = info.event_information.status
                    const league = info.league
                    const home_hits = info.home_batter_totals.hits
                    const home_runs = info.home_batter_totals.runs
                    const home_errors = info.home_errors
                    const away_hits = info.away_batter_totals.hits
                    const away_runs = info.away_batter_totals.runs
                    const away_errors = info.away_errors
                    const home_team_name = info.home_team.full_name
                    const away_team_name = info.away_team.full_name
                    const home_scores = JSON.stringify(info.home_period_scores)
                    const away_scores = JSON.stringify(info.away_period_scores)
                    const event_info = JSON.stringify(info.event_information)
                    const insert = await knex.insert({
                        league: league,
                        event_id: args.id,
                        status: status,
                        home_team_name: home_team_name,
                        away_team_name: away_team_name,
                        home_scores: home_scores,
                        away_scores: away_scores,
                        home_hits: home_hits,
                        home_runs: home_runs,
                        home_errors: home_errors,
                        away_hits: away_hits,
                        away_runs: away_runs,
                        away_errors: away_errors,
                        event_info: event_info
                    }).table('events').returning('*')
                    return {
                        id: insert[0].id,
                        event_id: insert[0].event_id,
                        status: insert[0].status,
                        league: insert[0].league,
                        home_team_name: insert[0].home_team_name,
                        away_team_name: insert[0].away_team_name,
                        home_scores: JSON.stringify(insert[0].home_scores),
                        away_scores: JSON.stringify(insert[0].away_scores),
                        home_hits: insert[0].home_hits,
                        home_runs: insert[0].home_runs,
                        home_errors: insert[0].home_errors,
                        away_hits: insert[0].away_hits,
                        away_runs: insert[0].away_runs,
                        away_errors: insert[0].away_errors,
                        event_info: JSON.stringify(insert[0].event_info),

                    }
                } else {
                    if (current_time - game[0].last_updated < 15000) {
                        console.log('cache')
                        return {
                            id: game[0].id,
                            event_id: game[0].event_id,
                            status: game[0].status,
                            league: game[0].league,
                            home_team_name: game[0].home_team_name,
                            away_team_name: game[0].away_team_name,
                            home_scores: JSON.stringify(game[0].home_scores),
                            away_scores: JSON.stringify(game[0].away_scores),
                            home_hits: game[0].home_hits,
                            home_runs: game[0].home_runs,
                            home_errors: game[0].home_errors,
                            away_hits: game[0].away_hits,
                            away_runs: game[0].away_runs,
                            away_errors: game[0].away_errors,
                            event_info: JSON.stringify(game[0].event_info)
                        }
                    }
                    console.log('re-hydrating cache and returning fresh data')
                    const data = await axios({
                        method: 'get',
                        url: `https://chumley.barstoolsports.com/dev/data/games/${args.id}.json`,
                        responseType: 'json'
                    })
                    const info = data.data
                    const status = info.event_information.status
                    const league = info.league
                    const home_hits = info.home_batter_totals.hits
                    const home_runs = info.home_batter_totals.runs
                    const home_errors = info.home_errors
                    const away_hits = info.away_batter_totals.hits
                    const away_runs = info.away_batter_totals.runs
                    const away_errors = info.away_errors
                    const home_team_name = info.home_team.full_name
                    const away_team_name = info.away_team.full_name
                    const home_scores = JSON.stringify(info.home_period_scores)
                    const away_scores = JSON.stringify(info.away_period_scores)
                    const event_info = JSON.stringify(info.event_information)
                    const insert = await knex.update({
                        league: league,
                        event_id: args.id,
                        status: status,
                        home_team_name: home_team_name,
                        away_team_name: away_team_name,
                        home_scores: home_scores,
                        away_scores: away_scores,
                        home_hits: home_hits,
                        home_runs: home_runs,
                        home_errors: home_errors,
                        away_hits: away_hits,
                        away_runs: away_runs,
                        away_errors: away_errors,
                        event_info: event_info
                    }).table('events').where({ event_id: args.id }).returning('*')
                    return {
                        id: insert[0].id,
                        event_id: insert[0].event_id,
                        status: insert[0].status,
                        league: insert[0].league,
                        home_team_name: insert[0].home_team_name,
                        away_team_name: insert[0].away_team_name,
                        home_scores: JSON.stringify(insert[0].home_scores),
                        away_scores: JSON.stringify(insert[0].away_scores),
                        home_hits: insert[0].home_hits,
                        home_runs: insert[0].home_runs,
                        home_errors: insert[0].home_errors,
                        away_hits: insert[0].away_hits,
                        away_runs: insert[0].away_runs,
                        away_errors: insert[0].away_errors,
                        event_info: JSON.stringify(insert[0].event_info)
                    }
                }

            } catch (error) {
                console.log('try catch error:', error)
            }
        }
    },
}



const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
