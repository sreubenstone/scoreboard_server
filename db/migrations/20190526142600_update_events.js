exports.up = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.integer("home_hits");
        table.integer("home_runs");
        table.integer("home_errors");
        table.integer("away_hits");
        table.integer("away_runs");
        table.integer("away_errors");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table("events", function (table) {
        table.dropColumn('home_hits');
        table.dropColumn('home_runs');
        table.dropColumn('home_errors');
        table.dropColumn('away_hits');
        table.dropColumn('away_runs');
        table.dropColumn('away_errors');
    });
};