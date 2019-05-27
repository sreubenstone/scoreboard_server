exports.up = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.timestamp("last_updated").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.dropColumn('last_updated');
    });
};