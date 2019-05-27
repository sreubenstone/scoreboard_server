require("dotenv").config();
const knexConfig = require("./db/knex").development;
const knex = require("knex")(knexConfig);

const id = 'eed38457-db28-4658-ae4f-4d4d38e9e212'

const dog = Date.now()

const cat = new Date(dog)

const test = async () => {
    const game = await knex.select().table('events').where({ event_id: id })
    console.log(game[0])

    console.log('diff:', dog - game[0].created_at)

}


test()

// wire up by league