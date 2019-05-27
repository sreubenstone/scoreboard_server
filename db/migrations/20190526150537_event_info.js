exports.up = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.jsonb("event_info");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.dropColumn('event_info');
    });
};