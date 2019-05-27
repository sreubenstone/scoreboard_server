exports.up = function (knex, Promise) {
    return knex.schema.createTable("events", function (table) {
        table.increments("id");
        table.string("event_id");
        table.jsonb("event_info");
        table.timestamp("last_updated").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("events");
};