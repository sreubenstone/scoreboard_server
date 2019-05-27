exports.up = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.string("league")
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.dropColumn('league');
    });
};