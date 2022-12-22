/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stocks", (table) => {
    table.increments("id").primary();
    table.integer("user_id");
    table.string("ticker_name");
    table.string("company_name");
    table.integer("number_of_stocks");
    table.float("unit_price").notNullable();
    table.string("sector")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("stocks");
};
