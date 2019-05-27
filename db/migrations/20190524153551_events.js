exports.up = function (knex, Promise) {
    return knex.schema.createTable("events", function (table) {
        table.increments("id");
        table.string("event_id");
        table.string("status");
        table.string("home_team_name")
        table.jsonb("home_scores");
        table.string("away_team_name");
        table.jsonb("away_scores");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("events");
};